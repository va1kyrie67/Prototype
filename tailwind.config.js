/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f5ff",
          100: "#dce6fb",
          200: "#bdd4f7",
          300: "#8fb8f0",
          400: "#5a94e7",
          500: "#3574d9",
          600: "#1f5bc2",
          700: "#174195",
          800: "#133678",
          900: "#0f2b5e",
        },
        ink: {
          DEFAULT: "#0c1628",
          600: "#3a4258",
          500: "#5a6278",
          400: "#8a90a0",
        },
        panel: {
          navy: "#0c2350",
        },
        danger: {
          DEFAULT: "#d92d20",
          light: "#fef4f2",
        },
        surface: {
          muted: "#f4f6f9",
        },
        accent: {
          gold: "#f5a623",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
        cardHover:
          "0 10px 25px rgba(0,0,0,.08), 0 4px 10px rgba(0,0,0,.05)",
        panel: "0 4px 20px rgba(0,0,0,.15)",
        tilt: "6px 6px 20px rgba(0,0,0,.12)",
        pill: "0 2px 8px rgba(0,0,0,.1)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(200%) skewX(-15deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(23,65,149,.15)" },
          "50%": { boxShadow: "0 0 40px rgba(23,65,149,.25)" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        sheen: "sheen 3.8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        fadeInUp: "fadeInUp .7s ease-out forwards",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
