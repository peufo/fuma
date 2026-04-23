import { codeToHtml } from 'shiki'

export function transformPackageImports(code: string): string {
	return code
		.replace(/from\s+['"]\$lib\/index\.ts['"]/g, "from 'fuma'")
		.replace(/from\s+['"]\$lib\/ui\/[^'"]+['"]/g, "from 'fuma/ui'")
		.replace(/from\s+['"]\$lib\/utils\/[^'"]+['"]/g, "from 'fuma/utils'")
		.replace(/from\s+['"]\$lib\/state\/[^'"]+['"]/g, "from 'fuma/state'")
		.replace(/from\s+['"]\$lib\/validation\/[^'"]+['"]/g, "from 'fuma/validation'")
		.replace(/from\s+['"]\$lib\/action\/[^'"]+['"]/g, "from 'fuma/action'")
		.replace(/from\s+['"]\$lib\/server\/[^'"]+['"]/g, "from 'fuma/server'")
}

export async function highlight(code: string, lang = 'svelte', theme: 'light' | 'dark' = 'dark') {
	return codeToHtml(code, {
		lang,
		theme: theme === 'dark' ? 'github-dark' : 'github-light',
		rootStyle: 'padding: 0.5rem 1rem;'
	})
}
