import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/style.ts'
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.65rem',
        xs: '0.7rem'
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', "Open Sans", 'ui-sans-serif', 'system-ui'],
        logo: ['var(--font-logo)']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        showFormError: {
          from: { height: "0rem" },
          to: { height: "4rem" }
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: 'translateY(-2px)' },
          to: { opacity: "1", transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: 'translateX(2px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: 'translateY(2px)' },
          to: { opacity: "1", transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: 'translateX(-2px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        rotate180: {
          from: { transform: 'rotate(0)' },
          to: { transform: 'rotate(90deg)' }
        }
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        rotate180: 'rotate180 150ms ease-in-out'
      },
    },

  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
}
export default config