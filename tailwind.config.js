/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#070a14',
          800: '#0b1020',
          700: '#111633',
          600: '#1a2040',
        },
        ink: {
          100: '#e6ebff',
          200: '#c4cbe8',
          300: '#8f99be',
          400: '#5b6690',
        },
        accent: {
          indigo: '#6366f1',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Space Grotesk"', '"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(99,102,241,0.45)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
