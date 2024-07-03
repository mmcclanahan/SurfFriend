/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myGreen: "#14A76C",
        myGreenHover: "#0D7B4F",
        myRed: "#FF652f",
        myRedHover: "#E64A19",
        myGray: "#747474",
        myBlack: "#272727",
        myYellow: "#FFE400",
        myYellowHover: "#FFD300",
      },
    },
  },
  plugins: [],
};
