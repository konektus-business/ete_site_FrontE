/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        crmPrimary: '#1EB394',
        crmSidebarBg: '#062D24',
        crmNavbarBg: '#E2E8F0',
        crmBg: '#F0FDFA',
      },
      fontFamily: {
        sans: ["Archivo", '"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};