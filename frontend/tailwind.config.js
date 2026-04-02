/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy aliases kept so old usages don't break
        green: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          light: '#A78BFA',
        },
        brand: {
          indigo:  '#6366F1',
          violet:  '#8B5CF6',
          cyan:    '#22D3EE',
          emerald: '#10B981',
          rose:    '#F43F5E',
        },
        surface: {
          DEFAULT: '#0F0F1A',
          card:    'rgba(255,255,255,0.04)',
          hover:   'rgba(255,255,255,0.07)',
          border:  'rgba(255,255,255,0.08)',
        },
        ink: {
          primary:   '#F1F5F9',
          secondary: '#94A3B8',
          muted:     '#475569',
        },
      },
      fontFamily: {
        sans:    ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.04'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'hero-glow':    'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25) 0%, transparent 70%)',
        'card-glow':    'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.04) 100%)',
      },
      boxShadow: {
        'glow-indigo': '0 0 40px rgba(99,102,241,0.25)',
        'glow-cyan':   '0 0 40px rgba(34,211,238,0.2)',
        'card':        '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        'card-hover':  '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.3)',
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out both',
        'fade-up':    'fadeUp 0.7s ease-out both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp:  { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { from: { backgroundPosition: '-500px 0' }, to: { backgroundPosition: '500px 0' } },
      },
    },
  },
  plugins: [],
};
