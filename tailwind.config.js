/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#fff8f0",
          100: "#ffecd4",
          200: "#ffd49a",
          300: "#ffb54d",
          400: "#ff9414",
          500: "#e67e00",
          600: "#c45f00",
          700: "#9a4400",
        },
        clay: {
          50: "#faf6f1",
          100: "#f0e8dc",
          200: "#ddd0c0",
          300: "#c4b19a",
          400: "#a78b6e",
          500: "#8b6f52",
          600: "#6f5843",
        },
        ink: "#1c1410",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "warm-radial":
          "radial-gradient(1200px 800px at 20% 10%, rgba(255,180,80,0.15), transparent 55%), radial-gradient(900px 600px at 90% 30%, rgba(196,140,80,0.12), transparent 50%)",
        "gold-shine":
          "linear-gradient(120deg, rgba(255,215,140,0.35) 0%, rgba(255,255,255,0.08) 45%, rgba(255,200,100,0.25) 100%)",
      },
      animation: {
        shimmer: "shimmer 2.8s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
