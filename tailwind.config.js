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
        primarylight2: "#FFE7D1",
        whitebg: "#FBFBFB",
        textcolor: "#252525",
        textsec: "#8D8D8D",
        text2 : "#A3A3A3",
        yellowStar : "#FFD700",
        success : "#40D046",
        fail : "#EF0000",
        wait : "#FFC107",
        hover : "#FFAA2A"
      },
      fontSize: {
        h1: "2rem",
        h2: "1.5rem",
        h3: "1.16rem",
        m: "1rem",
        s: "0.875rem",
        vs: "0.75rem",
      },
      size: {
        553: "34.5rem",
      },
      width: {
        553: '34.5rem',
      },
      boxShadow: {
        "bottom": "0px -4px 4px 0px rgba(0, 0, 0, 0.15)",
        "top" : "0px 4px 4px 0px rgba(0, 0, 0, 0.15)",
      },
      width: {
        '45': '47%',
      },
    },
  },
  plugins: [],
};