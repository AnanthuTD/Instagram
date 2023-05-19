/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                side_bar_hover: "#121212",
                border_grey: "#363837",
                brightBlue: "#00c2f7",
                _grey:"#121212",
                secondryText: "rgb(168 168 168)",
                primaryText: "rgb(245 245 245)",
                elevated:"rgb(38 38 38)",
                blackBlur:'#000000ad'
            },
            maxWidth: {
                '1/2': '50%',
              }
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".no-scrollbar::-webkit-scrollbar": {
                    display: "none",
                },
                ".no-scrollbar": {
                    /* "-ms-overflow-style": "none",
                    "scrollbar-width": "none", */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".pointer-events-auto": {
                    "pointer-events": "auto",
                },
            });
        }),
    ],
};
