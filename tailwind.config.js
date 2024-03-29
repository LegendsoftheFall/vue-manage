/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      big: 550,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: "1124px",
      xl: "1124px",
      "2xl": "1124px",
    },
    extend: {
      animation: {
        toastIn: 'toastIn .8s both',
        toastOut: 'toastOut .8s both'
      },
      keyframes: {
        toastIn: {
          '0%': {
            transform: 'translate(100px) scale(0.7)',
            opacity: 0.7
          },
          '80%': { transform: 'translate(0px) scale(0.7)', opacity: 0.7 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        toastOut: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '20%': { transform: 'translate(0px) scale(0.7)', opacity: 0.7 },
          '100%': {
            transform: 'translate(100px) scale(0.7)',
            opacity: 0
          }
        }
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
        sans: ['Barlow', 'sans-serif']
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          lg: "1124px",
          xl: "1124px",
          "2xl": "1124px",
        },
      },
      colors: {
        "bookmark-purple": "#5267DF",
        "bookmark-red": "#FA5959",
        "bookmark-blue": "#242A45",
        "bookmark-grey": "#9194A2",
        "bookmark-white": "#f7f7f7",
        gray: {
          1: 'rgba(248, 251, 255, 0.8)',
          2: 'rgba(214, 216, 217, 0.89)',
          3: '#edf0f5',
          50: '#F9FAFB',
          100: '#E0E6E9',
          300: '#F1F1F1',
          400: '#E0E0E0',
          500: '#ABBBC2',
          600: '#7E7E7E',
          900: '#1F1D2B',
          800: '#252836',
          700: '#393C49'
        },
        green: {
          1: '#04BE02'
        },
        blue: {
          1: '#336599',
          450: '#1e90ff',
          500: '#1976D2',
          600: '#0C63D4'
        }
      },
      spacing: {
        4.5: '1.125rem'
      },
      borderWidth: {
        0.5: '0.5px',
        0.25: '0.25px',
        0.05: '0.05px'
      },
      width: {
        18: '72px',
        19: '80px',
        '1/10': '10%',
        '1/8': '12.5%',
        70: '270px',
        90: '360px',
        94: '368px',
        100: '400px',
        120: '480px',
        140: '560px'
      },
      height: {
        15: '62px',
        18: '72px',
        19: '80px',
        23: '92px',
        38: '152px',
        60: '240px',
        66: '264px',
        70: '270px',
        90: '360px',
        100: '400px',
        110: '440px',
        150: '600px',
        200: '800px'
      },
      inset: {
        66: '264px',
        70: '270px',
        72: '278px',
        90: '360px',
        100: '400px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
}
