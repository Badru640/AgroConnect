/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: 'glow 2s infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': {
            textShadow: '0 0 1px #4a4a4a, 0 0 2px #4a4a4a, 0 0 3px #2d2d2d, 0 0 4px #2d2d2d',
          },
          '100%': {
            textShadow: '0 0 2px #4a4a4a, 0 0 4px #4a4a4a, 0 0 6px #2d2d2d, 0 0 8px #2d2d2d',
          },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  },
}
