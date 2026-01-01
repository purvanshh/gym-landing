/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './three/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Futuristic Cyber Palette
        'cyber-dark': '#0a0a1a',
        'cyber-deep': '#12122a',
        'cyber-surface': '#1a1a3a',
        'electric-blue': '#00d4ff',
        'cyber-magenta': '#ff00ff',
        'cyber-purple': '#8b5cf6',
        'cyber-pink': '#f472b6',
        'cyber-cyan': '#22d3ee',
        'cyber-green': '#00ff88',
        // Legacy support
        'neon': '#00d4ff',
        'pure-black': '#0a0a1a',
        'pure-white': '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
        '12xl': '14rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.5), 0 0 80px rgba(255, 0, 255, 0.3)',
          },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(0, 212, 255, 0.5)' },
          '50%': { borderColor: 'rgba(255, 0, 255, 0.5)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #8b5cf6 100%)',
        'gradient-cyber-dark': 'linear-gradient(135deg, #0a0a1a 0%, #12122a 50%, #1a1a3a 100%)',
        'gradient-glow': 'linear-gradient(180deg, rgba(0, 212, 255, 0.1) 0%, transparent 100%)',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.2)',
        'cyber-lg': '0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(255, 0, 255, 0.3)',
        'glow-blue': '0 0 30px rgba(0, 212, 255, 0.5)',
        'glow-magenta': '0 0 30px rgba(255, 0, 255, 0.5)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
