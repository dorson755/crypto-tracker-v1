/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        richBg:     '#1B2A25',
        richPanel:  '#22332E',
        gold:       '#B79F55',
        ivory:      '#E4DCCF',
        panelBorder:'#B79F55',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        rich: '0 4px 12px rgba(23,18,15,0.5)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
