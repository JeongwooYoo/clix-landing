/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          'Inter',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif'
        ]
      },
      colors: {
        brand: {
          50: '#e9fbf7',
          100: '#c9f6eb',
          200: '#9feddc',
          300: '#63e0c9',
          400: '#2cd2b5',
          500: '#00c49f',
          600: '#00a184',
          700: '#007f69',
          800: '#066555',
          900: '#0a5246'
        }
      },
      backgroundImage: {
        'grid-radial': 'radial-gradient(circle at 50% 50%, rgba(0,196,159,0.25), transparent 60%)',
        'hero-glow': 'radial-gradient(circle at 20% 30%, rgba(0,196,159,0.35), transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,196,159,0.25), transparent 75%)'
      }
    }
  },
  plugins: []
};
