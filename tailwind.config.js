module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    minWidth: {
      '3/5' : '60%',
      'search' : '80px'
    },
    screens: {
      'custom': '960px',
      'small': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
    }, borderWidth: {
      '1': '1px',
      '2': '2px',
      'half': '0.5px'
    }
    
  },
  plugins: [],
}
