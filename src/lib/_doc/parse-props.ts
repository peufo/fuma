import type { PropDef } from './DocProps.svelte'

export function parseProps(source: string): PropDef[] {
	const script = extractScript(source)
	if (!script) return []

	// Try Svelte 5 $props() first
	const declaration = findPropsDeclaration(script)
	if (declaration) {
		const destructured = parseDestructuring(declaration.destructuring)
		const typed = parseType(declaration.type)
		return mergeToPropDefs(destructured, typed)
	}

	// Fallback to Svelte 3/4 export let syntax
	return parseExportLetProps(script)
}

function extractScript(source: string): string | null {
	const moduleMatch = source.match(/<script\s+lang="ts"\s+module>[\s\S]*?<\/script>/)
	let cleaned = source
	if (moduleMatch && moduleMatch.index !== undefined) {
		cleaned =
			source.slice(0, moduleMatch.index) + source.slice(moduleMatch.index + moduleMatch[0].length)
	}

	const scriptMatch = cleaned.match(
		/<script\s+lang="ts"\s*(?:generics="[^"]*")?\s*>([\s\S]*?)<\/script>/
	)
	if (scriptMatch) return scriptMatch[1]

	// Fallback for plain .ts files (no <script> tag)
	if (!cleaned.includes('<script')) return cleaned

	return null
}

function findPropsDeclaration(
	script: string
): { destructuring: string; type: string | null } | null {
	const letIndex = script.indexOf('let {')
	if (letIndex === -1) return null

	let i = letIndex + 4
	let braceDepth = 0
	let destructuringEnd = -1

	for (; i < script.length; i++) {
		if (script[i] === '{') braceDepth++
		else if (script[i] === '}') {
			braceDepth--
			if (braceDepth === 0) {
				destructuringEnd = i
				break
			}
		}
	}
	if (destructuringEnd === -1) return null

	const destructuring = script.slice(letIndex + 5, destructuringEnd)

	let j = destructuringEnd + 1
	while (j < script.length && /\s/.test(script[j])) j++

	let type: string | null = null
	if (script[j] === ':') {
		j++
		while (j < script.length && /\s/.test(script[j])) j++

		const propsIndex = script.indexOf('= $props()', j)
		if (propsIndex !== -1) {
			type = script.slice(j, propsIndex).trim()
		}
	}

	return { destructuring, type }
}

interface DestructuredProp {
	alias: string
	defaultValue?: string
}

function parseDestructuring(str: string): Map<string, DestructuredProp> {
	const props = new Map<string, DestructuredProp>()
	const items = splitByComma(str)

	for (const item of items) {
		if (item.startsWith('...')) continue

		const eqIndex = findTopLevel(item, ' = ')
		const beforeEq = eqIndex >= 0 ? item.slice(0, eqIndex).trim() : item.trim()
		const defaultValue = eqIndex >= 0 ? item.slice(eqIndex + 3).trim() : undefined

		const colonIndex = findTopLevel(beforeEq, ': ')
		const name = colonIndex >= 0 ? beforeEq.slice(0, colonIndex).trim() : beforeEq

		props.set(name, { alias: name, defaultValue })
	}

	return props
}

interface TypedProp {
	type: string
	required: boolean
	description?: string
}

function parseType(typeStr: string | null): Map<string, TypedProp> {
	const props = new Map<string, TypedProp>()
	if (!typeStr) return props

	const cleaned = removeComments(typeStr)
	const firstBrace = cleaned.indexOf('{')
	if (firstBrace === -1) return props

	let depth = 0
	let start = -1
	let end = -1
	for (let i = 0; i < cleaned.length; i++) {
		if (cleaned[i] === '{') {
			if (depth === 0) start = i
			depth++
		} else if (cleaned[i] === '}') {
			depth--
			if (depth === 0) {
				end = i
				break
			}
		}
	}

	if (start === -1 || end === -1) return props

	const content = cleaned.slice(start + 1, end)
	return parseTypeObject(content)
}

function parseTypeObject(content: string): Map<string, TypedProp> {
	const props = new Map<string, TypedProp>()
	const lines = content.split('\n')
	const propStartRegex = /^([a-zA-Z_$][a-zA-Z0-9_$]*)(\??)\s*:\s*(.*)$/

	let currentName: string | null = null
	let currentOptional = false
	let currentType = ''
	let currentDescription = ''
	let depth = 0
	let pendingDescription = ''

	for (let line of lines) {
		line = line.trim()
		if (!line) continue

		const jsdocMatch = line.match(/\/\*\*\s*(.*?)\s*\*\//)
		if (jsdocMatch) {
			pendingDescription = jsdocMatch[1].trim()
			continue
		}

		const commentMatch = line.match(/\/\/\s*(.*)/)
		if (commentMatch) {
			pendingDescription = commentMatch[1].trim()
			continue
		}

		for (const char of line) {
			if (char === '{' || char === '(' || char === '[') depth++
			else if (char === '}' || char === ')' || char === ']') depth--
		}

		const match = line.match(propStartRegex)

		if (match && depth === 0) {
			if (currentName) {
				props.set(currentName, {
					type: currentType.trim(),
					required: !currentOptional,
					description: currentDescription || undefined
				})
			}
			currentName = match[1]
			currentOptional = match[2] === '?'
			currentType = match[3]
			currentDescription = pendingDescription
			pendingDescription = ''
		} else if (currentName && depth >= 0) {
			currentType += ` ${line}`
		}
	}

	if (currentName) {
		props.set(currentName, {
			type: currentType.trim(),
			required: !currentOptional,
			description: currentDescription || undefined
		})
	}

	return props
}

function parseExportLetProps(script: string): PropDef[] {
	const defs: PropDef[] = []
	const regex =
		/export\s+let\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?::\s*([^=\n]+))?\s*(?:=\s*([^\n]+))?/g
	let match: RegExpExecArray | null = null
	while (true) {
		match = regex.exec(script)
		if (match === null) break
		const [, name, typeStr, defaultValue] = match
		defs.push({
			name,
			type: typeStr ? typeStr.trim() : 'unknown',
			default: defaultValue ? defaultValue.trim() : undefined,
			required: !defaultValue
		})
	}
	return defs
}

function mergeToPropDefs(
	destructured: Map<string, DestructuredProp>,
	typed: Map<string, TypedProp>
): PropDef[] {
	const defs: PropDef[] = []

	for (const [name, { defaultValue }] of destructured) {
		const typeInfo = typed.get(name)
		let isRequired = typeInfo?.required ?? false
		let type = typeInfo?.type ?? 'unknown'

		// Clean up union types starting with |
		if (type.startsWith('| ')) {
			type = type.slice(2).trim()
		}

		if (defaultValue) {
			if (defaultValue.startsWith('$bindable')) {
				// $bindable() means it's bindable but may still be required
				// keep required as-is from type
			} else {
				isRequired = false
			}
		}

		defs.push({
			name,
			type,
			default: defaultValue && !defaultValue.startsWith('$bindable') ? defaultValue : undefined,
			required: isRequired,
			description: typeInfo?.description
		})
	}

	return defs
}

function splitByComma(str: string): string[] {
	const items: string[] = []
	let current = ''
	let depth = 0
	for (const char of str) {
		if (char === '{' || char === '(' || char === '[' || char === '<') depth++
		else if (char === '}' || char === ')' || char === ']' || char === '>') depth--
		else if (char === ',' && depth === 0) {
			if (current.trim()) items.push(current.trim())
			current = ''
			continue
		}
		current += char
	}
	if (current.trim()) items.push(current.trim())
	return items
}

function findTopLevel(str: string, pattern: string): number {
	let depth = 0
	for (let i = 0; i <= str.length - pattern.length; i++) {
		const char = str[i]
		if (char === '{' || char === '(' || char === '[' || char === '<') depth++
		else if (char === '}' || char === ')' || char === ']' || char === '>') depth--
		else if (depth === 0 && str.slice(i, i + pattern.length) === pattern) {
			return i
		}
	}
	return -1
}

function removeComments(str: string): string {
	return str.replace(/\/\/.*$/gm, '')
}
