/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-bg)',
        secondary: 'var(--secondary-bg)',
        accent: 'var(--accent-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-custom': 'var(--border-color)',
        'hover-bg': 'var(--hover-bg)'
      }
    },
  },
  plugins: [],
} 