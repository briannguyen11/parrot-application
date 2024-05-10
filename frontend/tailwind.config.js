/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },

  fontFamily: {
    body: ["system-ui", "sans-serif"],
    sidebar: ["system-ui", "sans-serif"],
  },

  extend: {
    boxShadow: {
      light: "0px 2px 14px 0px rgba(0, 0, 0, 0.08)",
      "light-hover": "0px 2px 14px 0px rgba(0, 0, 0, 0.14)",
    },

    backgroundImage: {
      "gradient": "url('/src/assets/images/gradient.png')",
      "home-pattern" : "url('/src/assets/icons/background.svg')",
    
    },

    height: {
      "spotlight-img": "calc(100% - 64px)",
      sidebar: "calc(100vh - 64px)",
    },

    aspectRatio: {
      spotlight: "4/3",
    },
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
        hover: "var(--card-hover)",
        red: "hsl(var(--card-red))",
        purple: "hsl(var(--card-purple))",
        yellow: "var(--card-yellow)",
        blue: "var(--card-blue)",
        green: "var(--card-green)",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },

    screens: {
      "4xl": "2200px",
      "xl+": "1330px",
      "showcase-xl": "1280px",
      xs: "375px",
    },

    scale: {
      103: "1.03",
      101: "1.005",
    },
  },
};
// eslint-disable-next-line no-undef
export const plugins = [require("tailwindcss-animate")];
