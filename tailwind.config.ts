import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced Cozy Theme Colors with better contrast
        cream: {
          50: '#fefefe',
          100: '#fdfcf9',
          200: '#f9f6f0',
          300: '#f3ede3',
          400: '#eee7d4', // Main background
          500: '#e8e0c8',
          600: '#e2d9bc',
          700: '#dcd2b0',
          800: '#d6cba4',
          900: '#d0c498',
          950: '#cabd8c',
        },
        brown: {
          50: '#f8f6f4',
          100: '#f1ede8',
          200: '#e3dbd1',
          300: '#d4c0a8', // Secondary accent
          400: '#c9b9a6', // Border neutral
          500: '#b29982', // Primary accent
          600: '#a08a73',
          700: '#8e7b64',
          800: '#7a6754', // Text secondary
          900: '#665a4a',
          950: '#5c4630', // Dark brown
        },
        darkBrown: '#5c4630', // For headings and strong accents
        textPrimary: '#2d1f16', // Darker text for better contrast
        textSecondary: '#5a4a3a', // Enhanced secondary text with better contrast
        borderNeutral: '#c9b9a6', // Border color
        // New semantic colors for better UI
        surface: {
          50: '#fefefe',
          100: '#fdfcf9',
          200: '#f9f6f0',
          300: '#f3ede3',
          400: '#eee7d4',
          500: '#e8e0c8',
        },
        accent: {
          50: '#f8f6f4',
          100: '#f1ede8',
          200: '#e3dbd1',
          300: '#d4c0a8',
          400: '#c9b9a6',
          500: '#b29982',
        },
        // Enhanced status colors
        success: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5c9',
          300: '#8dd3a8',
          400: '#5bb884',
          500: '#3d9b6b',
          600: '#2f7c56',
          700: '#286247',
          800: '#234f3a',
          900: '#1f4230',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(92, 70, 48, 0.05)',
        'sm': '0 1px 3px rgba(92, 70, 48, 0.1)',
        'soft': '0 2px 8px rgba(92, 70, 48, 0.08)',
        'md': '0 4px 6px rgba(92, 70, 48, 0.1)',
        'medium': '0 4px 16px rgba(92, 70, 48, 0.12)',
        'lg': '0 10px 15px rgba(92, 70, 48, 0.1)',
        'large': '0 8px 32px rgba(92, 70, 48, 0.16)',
        'xl': '0 20px 25px rgba(92, 70, 48, 0.15)',
        '2xl': '0 25px 50px rgba(92, 70, 48, 0.25)',
        'inner': 'inset 0 2px 4px rgba(92, 70, 48, 0.06)',
        'glow': '0 0 20px rgba(178, 153, 130, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
} satisfies Config;
