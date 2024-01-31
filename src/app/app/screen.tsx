"use client"

import { cn } from "@/lib/tailwind"
import { RefObject, createContext, useContext, useRef } from "react"

const screen = createContext(undefined as RefObject<HTMLDivElement> | undefined)
export const useScreen = () => useContext(screen)

export function BaseScreen(p: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <screen.Provider value={ ref }>
      <div className={ cn(
        "w-screen h-screen",
        "bg-[#212432]"
      ) }
      >
        <div className={ cn(
          "w-screen h-screen",
          "grid grid-flow-row",
          "grid-cols-[3rem_13rem_minmax(0,_1fr)]",
          "grid-rows-1",
          "p-2 gap-2",

          "scale-100",

          "data-[transition-setting=true]:transition-all",
          "data-[transition-setting=true]:duration-150",
          "data-[transition-setting=true]:scale-90",
          "data-[transition-setting=true]:opacity-0",

          "data-[transition-setting=false]:transition-all",
          "data-[transition-setting=false]:duration-150",
        ) }
        ref={ ref }
        >
          { p.children }
        </div>
      </div>
    </screen.Provider>
  )
}
