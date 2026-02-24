import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0b0f1a",
        electric: "#3B82F6",
        violet: "#8B5CF6"
      },
      boxShadow: {
        neon: "0 0 20px rgba(59,130,246,0.45)",
        card: "0 10px 40px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
