/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FB8312",
        primarylight: "#FDD9B7",
        whitebg: "FBFBFB",
        textcolor: "#404040",
        textblack: "#010003",
        textsec: "#8D8D8D",
        textwhite: "#FAFAFA",
      },
      zIndex: {
        99: "999",
      },
    },
  },
  plugins: [],
};
