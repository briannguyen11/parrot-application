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
    raleway: ["Raleway", "sans-serif"],
    montserrat: ["Montserrat", "sans-serif"],
  },
  backgroundImage: {
    "parrot-gradient": "linear-gradient(to right, #1D425C, #C73B36, #E69215)",

    "navbar-gradient":
      "linear-gradient(to right, #1D425C, #C73B36, #E69215, #F9D423)",
  },

  extend: {
    boxShadow: {
      light: "0px 2px 14px 0px rgba(0, 0, 0, 0.08)",
      "light-hover": "0px 2px 14px 0px rgba(0, 0, 0, 0.14)",
    },

    width: {
      project: "calc(100% - 300px)",
    },

    height: {
      "spotlight-img": "calc(100% - 64px)",
      sidebar: "calc(100vh - 64px)",
      home: "calc(100vh - 64px)",
      messages: "calc(100vh - 128px)",
      "messages-r": "calc(100% - 21px)",
      "messages-r-1": "calc(100% - 57px)",
    },

    minHeight: {
      home: "calc(100vh - 64px)",
    },

    aspectRatio: {
      spotlight: "16/9",
    },
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "var(--background)",
      foreground: "hsl(var(--foreground))",
      

      parrot: {
        red: "var(--card-red)",
        purple: "var(--card-purple)",
        yellow: "var(--card-yellow)",
        blue: "var(--card-blue)",
        green: "var(--card-green)",

      },


      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
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
    
      },

      sidebar: {
        DEFAULT: "var(--sidebar)",
        hover: "var(--sidebar-hover)",
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
      "loading-bar": {
        "0%": { width: "0%" },
        "100%": { width: "100%" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "loading-bar": "loading-bar 0.6s ease-out",
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
