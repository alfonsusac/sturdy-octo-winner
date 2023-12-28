"use client"

import { Attributes, ButtonHTMLAttributes, useState } from "react"
import { Slot } from "../lib/slot"
import { delay } from "@/lib/devutil"
import { cn } from "@/lib/tailwind"
import { Icon } from '@iconify/react'

export function ButtonBase(p: React.ComponentProps<"button"> & {
  primary?: boolean
  secondary?: boolean
  outline?: boolean
  loading?: boolean
  success?: boolean
  block?: boolean
  small?: boolean
  large?: boolean
  square?: boolean
}) {
  const { primary, secondary, loading, success, block, large, square, small, ...rest } = p
  const ghost = !primary && !secondary
  const idle = !loading && !success
  const regular = !large && !small

  return <button className={ cn(
    "relative leading-none rounded-[0.25rem] font-medium text-white/90 flex flex-row items-center justify-center gap-1.5 border border-transparent",
    block && "w-full",

    regular && ["text-md h-9 min-w-[2.5rem]", !square && "px-5"],
    small && ["text-sm h-8 min-w-[2rem]", !square && "px-2.5"],
    large && ["text-md h-12 min-w-[3rem]", !square && "px-6"],
    "select-none",

    ghost && [
      "text-white/60",
      idle && [
        "hover:bg-white/10",
        "hover:text-white/90",
      ],
      !idle && [
        "border-transparent",
      ]
    ],

    primary && [
      "font-semibold",
      "bg-indigo-600",
      idle && [
        "border-indigo-800"
      ],
      loading && [
        "bg-indigo-800"
      ],
    ],

    secondary && [
      "font-semibold",
      "bg-indigo-100/10",
      loading && [
        'bg-white/10'
      ]
    ],

    idle ? [
      "hover:brightness-110",
      "active:brightness-75"
    ] : [
      "text-white/0",
    ],

    loading &&   "pointer-events-none",
    success && [
      "bg-transparent",
      "pointer-events-none",
    ]) }
    { ...rest }
  >
    { p.children }
    <div className={ cn(
      [
        "absolute",
        "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
        "text-2xl",
        "stroke-2"
      ],
      primary ? [
        "text-white/60"
      ] : [
        "text-white/60",
      ],

      success && [
        "text-blue-500"
      ]
    ) }>
      {
        loading &&
        <Icon icon="line-md:loading-twotone-loop" />
      }
      {
        success &&
        <Icon icon="line-md:confirm-circle" />
      }
    </div>
  </button>
}


export function Button2<T>(p: {
  children: React.ReactNode
  onClick: () => (Promise<T>)
  onSuccess?: (data: T) => void
  onError?: (error: T) => void
}) {
  const states = ["idle", "loading", "success"] as const
  const idle = 0
  const loading = 1
  const success = 2

  const [state, setState] = useState(0)
  const triggerSuccess = () => {
    setState(success)
    setTimeout(() => {
      setState(idle)
    }, 1000)
  }

  return (
    <Slot
      className="rounded-md hover:brightness-110 leading-none text-center font-semibold"
      data-state={ states[state] }
      render={ state }
      onClick={ () => {
        setState(loading)
        p.onClick().then((data) => {
          triggerSuccess()
          p.onSuccess?.(data)
        }
        ).catch((error) => {
          setState(idle)
          p.onError?.(error)
        }
        )
      } }
    >
      { p.children }
    </Slot>
  )
}

export function LoginButton() {
  return (
    <Button2 onClick={ async () => {
      await delay(3000)
      return
    } }>
      <button className={ cn(
        "group w-48 p-3 text-center",
        "bg-indigo-500",
        "data-[state=loading]:bg-indigo-500/20",
      ) }>
        <div className="hidden group-data-[state=idle]:block">
          Login via Google
        </div>
        <div className="text-lg text-indigo-500">
          <Icon
            icon="line-md:confirm-circle"
            className="hidden group-data-[state=success]:block"
          />
          <svg display="" className="hidden group-data-[state=success]:block" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="60" strokeDashoffset="60" d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0"></animate></path><path strokeDasharray="14" strokeDashoffset="14" d="M8 12L11 15L16 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="14;0"></animate></path></g></svg>
        </div>
      </button>
      <button className={ cn(
        "bg-indigo-500/20",
        ""
      ) }>
        <svg className="hidden group-data-[state=loading]:block" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path strokeDasharray="60" strokeDashoffset="60" strokeOpacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"></animate></path><path strokeDasharray="15" strokeDashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"></animate><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></g></svg>
        Loading
      </button>
      <button>
        Yes
      </button>
    </Button2>
  )
}

