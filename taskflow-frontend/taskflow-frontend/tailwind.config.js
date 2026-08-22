/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        flow: {
          DEFAULT: '#2952E3',
          dark: '#1B3A8C',
          light: '#EEF2FE',
        },
        ink: {
          DEFAULT: '#101828',
          soft: '#1D2939',
          muted: '#667085',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          bg: '#F5F7FB',
          border: '#E4E8F1',
        },
        priority: {
          low: '#64748B',
          medium: '#F5A524',
          high: '#E4483F',
        },
        status: {
          todo: '#94A3B8',
          progress: '#2952E3',
          done: '#1AA179',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        flowline: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        cardIn: {
          '0%': { opacity: '0', transform: 'translateY(6px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        flowline: 'flowline 3s linear infinite',
        cardIn: 'cardIn 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
