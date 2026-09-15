import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: [vitePreprocess()],
			compilerOptions: { experimental: { async: true } },
			adapter: adapter(),
			experimental: { remoteFunctions: true }
		}),
		tailwindcss(),
		devtoolsJson()
	],
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
})
