import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:'#EFF6FF',100:'#DBEAFE',200:'#BFDBFE',300:'#93C5FD',
          400:'#60A5FA',500:'#3B82F6',600:'#2563EB',700:'#1D4ED8',
          800:'#1E3A8A',900:'#0F2255',950:'#0A1628',DEFAULT:'#1D4ED8',
        },
        navy: {
          50:'#F0F4FF',100:'#E0E9FF',500:'#1B3A6B',700:'#0F2255',
          800:'#0C1B42',900:'#080F28',DEFAULT:'#0F2255',
        },
        surface: { DEFAULT:'#FFFFFF', secondary:'#F8FAFC', tertiary:'#F1F5F9' },
        border: { DEFAULT:'#E2E8F0', strong:'#CBD5E1' },
        text: { primary:'#0F172A', secondary:'#475569', disabled:'#94A3B8' },
        success: { DEFAULT:'#10B981', light:'#D1FAE5' },
        warning: { DEFAULT:'#F59E0B', light:'#FEF3C7' },
        danger: { DEFAULT:'#EF4444', light:'#FEE2E2' },
        info: { DEFAULT:'#3B82F6', light:'#DBEAFE' },
        slate: { 500:'#64748B', 700:'#334155' },
      },
      fontFamily: { sans: ['Inter','system-ui','sans-serif'] },
      fontSize: { '2xs': ['0.625rem',{lineHeight:'0.875rem'}] },
      borderRadius: { card:'0.75rem', btn:'0.5rem' },
      boxShadow: {
        card:'0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)',
        'card-md':'0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.08)',
        'card-lg':'0 10px 15px -3px rgba(0,0,0,0.08)',
        glow:'0 0 20px rgba(29,78,216,0.3)',
      },
      backgroundImage: {
        'hero-gradient':'linear-gradient(135deg, #0F2255 0%, #1D4ED8 50%, #0F2255 100%)',
        'brand-gradient':'linear-gradient(135deg, #1D4ED8, #3B82F6)',
      },
      animation: {
        'fade-in-up':'fadeInUp 0.6s ease-out',
        'fade-in':'fadeIn 0.4s ease-out',
        float:'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: { '0%':{opacity:'0',transform:'translateY(20px)'},'100%':{opacity:'1',transform:'translateY(0)'} },
        fadeIn: { '0%':{opacity:'0'},'100%':{opacity:'1'} },
        float: { '0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-8px)'} },
      },
    },
  },
  plugins: [],
}
export default config
