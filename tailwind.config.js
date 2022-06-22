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
      'small': '480px'
    }, borderWidth: {
      '1': '1px'
    }
    
  },
  plugins: [],
}
