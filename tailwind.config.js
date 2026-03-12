/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FEFCE8',
          100: '#FEF9C3',
          200: '#F7ECC8',
          300: '#D4AF47',
          400: '#C8A020',
          500: '#BF9920',
          600: '#A07A10',
          700: '#7A5200',
          800: '#5C3D00',
          900: '#3D2800',
        },
        cream: '#FFFDF5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Lato"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
