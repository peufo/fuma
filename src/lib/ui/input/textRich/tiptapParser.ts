import { generateHTML, generateJSON } from '@tiptap/html'
import type { JSONContent } from '@tiptap/core'
import { extensions } from './extensions.js'
import { jsonParse } from '$lib/utils/jsonParse.js'

export const tiptapParser = {
	toHTML(jsonAsString: string) {
		try {
			if (!jsonAsString.startsWith('{')) return jsonAsString
			const json = jsonParse<JSONContent>(jsonAsString, [])
			if (!json) return ''
			return generateHTML(json, extensions)
		} catch (err) {
			console.error(err)
			return ''
		}
	},
	toJSON(html: string) {
		try {
			const json = generateJSON(html, extensions)
			return JSON.stringify(json)
		} catch (err) {
			console.error(err)
			return ''
		}
	}
}
