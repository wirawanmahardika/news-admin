/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "main-1": "#007B8E",
        "main-2": "#AB9C11",
        "main-3": "#CB9E06",
        "main-4": "#C8C3C3",
        "main-5": "#F8B84E",
      },
      fontFamily: {
        geologica: "'Geologica', sans-serif",
        quicksand: "'Quicksand', sans-serif",
        raleway: "'Raleway', sans-serif",
        roboto: "'Roboto', sans-serif",
        poetsenOne: '"Poetsen One", sans-serif',
      },
    },
  },
  plugins: [],
}

