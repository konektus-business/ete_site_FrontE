/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", 
    "./*.html"
  ],
  theme: {
extend: {
      colors: {
        crmPrimary: '#1EB394',      
        crmPrimaryHover: '#1EB394', 
        crmSidebarBg: '#062D24', 
        crmNavbarBg: '#E2E8F0',  
        crmBg: '#F0FDFA',           
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}