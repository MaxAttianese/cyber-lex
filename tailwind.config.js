/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        body: ['Oxanium', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(168, 85, 247, 0.35)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.35)',
      },
    },
  },
  plugins: [],
};
