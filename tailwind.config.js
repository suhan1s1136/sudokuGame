// /** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    // "./*.html", 
    // "./*.js",   
    // "./*.css",  
    "./index.html",            // Path to the HTML file
    "./scripts/**/*.js",      // Path to JS files inside the scripts folder
    "./styles.css",   
  ],
  theme: {
    extend: {
      colors: {
        goodblue: '#B7C9F3', // Define goodblue color
      },
    },
  },
  plugins: [],
}

