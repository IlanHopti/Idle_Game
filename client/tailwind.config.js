/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        wood: '#8B4513', // Exemple de couleur brune évoquant le bois
        stone: '#808080' // Exemple de couleur grise évoquant la pierre
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
