import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        // Nirvana Chai Brand Colors
        sage: {
          DEFAULT: "#9CA68C",
          50: "#F5F6F3",
          100: "#EBEEE7",
          200: "#D7DDCF",
          300: "#C3CCB7",
          400: "#AFB99F",
          500: "#9CA68C",
          600: "#7D8570",
          700: "#5E6454",
          800: "#3F4338",
          900: "#20221C",
        },
        chai: {
          DEFAULT: "#B29370",
          50: "#F9F6F3",
          100: "#F3EDE7",
          200: "#E7DBCF",
          300: "#DBC9B7",
          400: "#CFB79F",
          500: "#B29370",
          600: "#8E755A",
          700: "#6A5743",
          800: "#46392D",
          900: "#231C16",
        },
        "off-white": "#F9F7F3",
        clay: {
          DEFAULT: "#D9A273",
          50: "#FBF7F3",
          100: "#F7EFE7",
          200: "#EFDFCF",
          300: "#E7CFB7",
          400: "#DFBF9F",
          500: "#D9A273",
          600: "#AE825C",
          700: "#826145",
          800: "#57412E",
          900: "#2B2017",
        },
        teal: {
          DEFAULT: "#557D77",
          50: "#F2F6F5",
          100: "#E5EDEB",
          200: "#CBDBD7",
          300: "#B1C9C3",
          400: "#97B7AF",
          500: "#557D77",
          600: "#44645F",
          700: "#334B47",
          800: "#22322F",
          900: "#111918",
        },
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
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
