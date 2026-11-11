export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./composables/**/*.{vue,js,ts}",
    "./plugins/**/*.{vue,js,ts}",
    "./app.{js,ts,vue}",
    "./app.vue",
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        /* 🌈 KIDS VIBRANT PALETTE */
        candy: "#ff4fa0",
        grape: "#8b5cf6",
        sky: "#38bdf8",
        ocean: "#0ea5e9",
        sunshine: "#facc15",
        mango: "#fb923c",
        mint: "#34d399",
        grass: "#22c55e",

        /* 🌸 SOFT BACKGROUNDS */
        softPink: "#ffe4f1",
        softBlue: "#e0f2fe",
        softYellow: "#fef9c3",
        softPurple: "#f3e8ff",
      },

      fontFamily: {
        kids: ["Fredoka", "Baloo 2", "Comic Sans MS", "cursive", "sans-serif"],
        fredoka: ["Fredoka", "cursive", "sans-serif"],
        baloo: ["Baloo 2", "cursive", "sans-serif"],
      },

      boxShadow: {
        cute: "0 10px 25px rgba(255, 105, 180, 0.25)",
        soft: "0 10px 20px rgba(0,0,0,0.1)",
      },

      borderRadius: {
        xl3: "2rem",
      },

      animation: {
        float: "float 4s ease-in-out infinite",
        bounceSoft: "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },

    },
  },

  plugins: [],
}