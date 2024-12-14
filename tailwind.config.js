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
        primarylight: "#FDCFA3",
        primarylight2: "#FDDFC3",
        whitebg: "#FBFBFB",
        textcolor: "#252525",
        textsec: "#8D8D8D",
        text2 : "#A3A3A3",
        yellowStar : "#FFD700",
        success : "#48C54D",
        fail : "#D14F4F",
        wait : "#E9AB0B",
        hover : "#FFAA2A",
        disable : "#E4CBB3",
        textchoco: "#C44E0A",
        textdarkchoco: "#9B3D11",
        disabletextbox: "#EFEFEF",
        iconcheck: "rgba(72, 197, 77, 0.30)",
        iconinfo: "rgba(233, 171, 11, 0.20)",
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