import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
function generateGridColumns(lastValue: number) {
	let obj: any = {};
	for (let i = 13; i < lastValue; i++) {
		obj[`${i}`] = `repeat(${i}, minmax(0, 1fr))`;
	}
	return obj;
}

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			xm: '450px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			'2lg': '1140px',
			xl: '1280px',
			'2xl': '1536px',
		},

		extend: {
			fontFamily: {
				poppins: ['var(--font-poppins)', ...fontFamily.sans],
			},
			colors: {
				primary: {
					green: '#85BC39',
					gray: '#666766',
				},
				black: {
					dark: '#2E2E2E',
				},
				gray: {
					muted: '#EAEAEB',
					light: '#EBF2F0',
					dark: '#DBDBDB',
				},
				action: {
					success: '#85BC39',
					danger: '#DB2627',
					warning: '#E8A84B',
					info: '#BF83FF',
				},
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'collapsible-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-collapsible-content-height)' },
				},
				'collapsible-up': {
					from: { height: 'var(--radix-collapsible-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'collapsible-down': 'accordion-down 0.2s ease-out',
				'collapsible-up': 'accordion-up 0.2s ease-out',
			},
			container: {
				center: true,
				padding: '1rem',
				screens: {
					sm: '600px',
					md: '728px',
					lg: '984px',
					xl: '1240px',
					'2xl': '1280px',
				},
			},
			gridTemplateColumns: {
				...generateGridColumns(24),
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
