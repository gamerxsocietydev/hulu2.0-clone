module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '2000px',
      },
      backgroundImage: {
        nike:
          "url('https://2rdnmg1qbg403gumla1v9i2h-wpengine.netdna-ssl.com/wp-content/uploads/sites/3/2019/06/cropped-GettyImages-643764514-745x490.jpg')",
      },
    },
    variants: {
      extend: {
        grid: ['responsive'],
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  },
}
