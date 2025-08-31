/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './lib/components/**/*.{js,ts,jsx,tsx,mdx}'
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
        },
        core: {
          50: 'var(--core-50)',
          100: 'var(--core-100)',
            200: 'var(--core-200)',
            300: 'var(--core-300)',
            400: 'var(--core-400)',
            500: 'var(--core-500)',
            600: 'var(--core-600)',
            700: 'var(--core-700)',
            800: 'var(--core-800)',
            900: 'var(--core-900)',
            950: 'var(--core-950)'
        }
      },
      backgroundImage: {
        'grid-radial': 'radial-gradient(circle at 50% 50%, rgba(0,196,159,0.25), transparent 60%)',
        'hero-glow': 'radial-gradient(circle at 20% 30%, rgba(0,196,159,0.35), transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,196,159,0.25), transparent 75%)'
      },
      keyframes: {
        'fade-swap': {
          '0%': { opacity: '0', transform: 'translateY(6px) scale(.97)' },
          '60%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        'fade-swap': 'fade-swap .45s cubic-bezier(.16,.8,.3,1) both'
      }
    }
  },
  plugins: []
};
