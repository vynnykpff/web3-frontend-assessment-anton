import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.module.css",
    "./components/**/*.module.css",
    "./lib/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nodveta: {
          50: "var(--nodveta-50)",
          500: "var(--nodveta-500)",
          600: "var(--nodveta-600)",
          700: "var(--nodveta-700)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-motionkit")({
      duration: "1s",
      delay: "500ms",
      iterationCount: "1",
      classes: [
        "fadeIn",
        "fadeInUp",
        "fadeInLeft",
        "fadeInRight",
        "slideInDown",
        "slideInUp",
        "zoomIn",
        "pulse",
        "infinite",
      ],
    }),
  ],
};

export default config;
