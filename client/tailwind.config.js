/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        wood: '#8B4513', // Exemple de couleur brune évoquant le bois
        coal: '#303030', // Exemple de couleur sombre évoquant le charbon
        stone: '#808080', // Exemple de couleur grise évoquant la pierre
        iron: '#434343', // Exemple de couleur grise évoquant le fer
        gold: '#FFD700', // Exemple de couleur jaune évoquant l'or
        diamond: '#00A0A0'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
