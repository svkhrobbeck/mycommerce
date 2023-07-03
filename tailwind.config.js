/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "bg-image-empty": 'url("./images/simoncat-empty.svg")',
      }),
      colors: {
        dark: "#191919",
      },
      fontFamily: {
        manrope: "Manrope, Arial, sans-serif",
      },
      screens: {
        xs: "350px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
