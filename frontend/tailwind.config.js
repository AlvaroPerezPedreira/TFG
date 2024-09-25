const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|dropdown|input|modal|ripple|spinner|menu|divider|popover).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}

