import type { Metadata } from 'next'
import { Inter, Open_Sans, Outfit } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/tailwind'
import { Toaster } from 'sonner'

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-open-sans',
})

const logo = Outfit({
  subsets: ['latin'],
  variable: '--font-logo',
})

export const metadata: Metadata = {
  title: 'You can do this!',
  description: 'Discord Clone to Learn about Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ cn(
        sans.variable,
        logo.variable,
        "font-sans",
        "bg-black",
        "text-indigo-100/90",
        "bg-gradient-to-b from-indigo-200/10 to-indigo-500/20",
        "selection:bg-green-800 data-[sonner-toast]:!font-normal"
      ) }>
        <Toaster toastOptions={ {
          unstyled: true,
          style: {
            fontWeight: 400,
          },
          classNames: {
            toast: " p-4 rounded-md text-sm w-full font-normal flex gap-2 items-center shadow-[0_0_4px_2px_#0004] bg-[#343850]",
            title: "!font-normal data-[sonner-toast]:!font-normal",
            default: "bg-[#343850]",
            success: "bg-[#37474D] [&_[data-icon]]:text-green-300/80",
          },
        } }
          visibleToasts={ Infinity } 
          expand={true}
        />
        { children }
      </body>
    </html>
  )
}
