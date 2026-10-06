/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kusa: {
          forest: "#0E3B33",
          "forest-dark": "#092520",
          "forest-light": "#155247",
          navy: "#0D1B2A",
          "navy-dark": "#070E16",
          gold: "#D4AF37",
          "gold-light": "#E8C866",
          "gold-hover": "#BF9B2F",
          "gold-subtle": "#F9F5EA",
          cream: "#F6F4EE",
          "cream-dark": "#EFECE2",
          sage: "#4E7C6B",
          "sage-light": "#EBF4F0",
          "sage-dark": "#36594C",
          card: "#FFFFFF",
          border: "#E5E7EB",
          "border-subtle": "#EDECE6",
          dark: "#08131F",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        jura: ["'Jura'", "sans-serif"],
        junge: ["'Junge'", "serif"],
        roboto: ["'Roboto'", "sans-serif"],
        "roboto-mono": ["'Roboto Mono'", "monospace"],
      },
      screens: {
        xs: "480px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "2xs": "0 1px 1px 0 rgb(0 0 0 / 0.05)",
        kusa: "0 4px 20px -2px rgba(14, 59, 51, 0.08)",
        "kusa-lg": "0 10px 30px -4px rgba(13, 27, 42, 0.12)",
        "kusa-gold": "0 8px 25px -4px rgba(212, 175, 55, 0.28)",
        "kusa-glow": "0 0 35px -5px rgba(212, 175, 55, 0.22)",
        "kusa-card": "0 20px 45px -15px rgba(14, 59, 51, 0.09)",
        "kusa-card-hover": "0 25px 50px -12px rgba(14, 59, 51, 0.18)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "goldShimmer 3.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        goldShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
