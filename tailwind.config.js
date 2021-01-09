module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "background": "#1d1d1d",
        "light": "hsla(0, 0%, 100%, 0.05)",
        "accent-1": "#333",
      },
    },
  },
  variants: {
    extend: {
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
