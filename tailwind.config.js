/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1597E4",
        error: "#D86161",
        success: "#4BB543",
        placeholder: "#7A7A7A",
        "font-white": "#FAFAFA",
        "border-gray": "#DADEDF",
        "background-gray": "#D8D8D8",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
