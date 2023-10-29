import { unstable_cache } from 'next/cache'
import type { Config } from 'tailwindcss'
import colors from "tailwindcss/colors"

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/style.ts'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)', "Open Sans", 'ui-sans-serif', 'system-ui']
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
        }
      }
    },

  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/typography'),
  ],
}
export default config

unstable_cache