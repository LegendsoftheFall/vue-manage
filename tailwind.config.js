/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
        // sans: ['"PT Sans"', 'sans-serif']
        // sans: [
        //   '"Inter"',
        //   'system-ui',
        //   '-apple-system',
        //   'BlinkMacSystemFont',
        //   '"Segoe UI"',
        //   'Roboto',
        //   '"Helvetica Neue"',
        //   'Arial',
        //   '"Noto Sans"',
        //   'sans-serif',
        //   '"Apple Color Emoji"',
        //   '"Segoe UI Emoji"',
        //   '"Segoe UI Symbol"',
        //   '"Noto Color Emoji"'
        // ]
      },
      colors: {
        gray: {
          1: 'rgba(248, 251, 255, 0.8)',
          2: 'rgba(214, 216, 217, 0.89)',
          50: '#F9FAFB',
          300: '#F1F1F1',
          400: '#E0E0E0',
          500: '#AEAEAE',
          600: '#7E7E7E',
          900: '#303030'
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
        19: '80px'
      },
      height: {
        18: '72px',
        19: '80px',
        38: '152px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
}
