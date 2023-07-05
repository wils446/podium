/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				darkGrey: "#121212",
				navbar: "#080808",
				lightGrey: "#222222",
				inputBg: "#1A1A1A",
			},
			boxShadow: {
				"inner-input": "inset 0 2px 4px 0 rgb(0 0 0 / 0.25);",
			},
			dropShadow: {
				"3xl": "0 25px 25px rgb(0 0 0 / 0.75)",
			},
		},
	},
	plugins: [],
};
