/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './pages/**/*.html',
    './components/**/*.html',
    './scripts/**/*.js',
    './styles/**/*.css'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        burntorange: '#E95A0C',
        darkorange: '#B76E00',
        charcoal: '#1A1A1A',
        darkbg: '#0F0F0F',
        lightgray: '#2A2A2A',
        accent: '#FF6B35'
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Raleway', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 20px #E95A0C'
          },
          '50%': {
            'box-shadow': '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px #E95A0C'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    }
  },
  plugins: []
}
