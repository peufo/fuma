/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		logs: false
	}
}

module.exports = config
