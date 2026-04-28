// tailwind.config.js
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)"],
        quicksand: ["var(--font-quicksand)"],
      },
    },
  },
  plugins: [],
};
