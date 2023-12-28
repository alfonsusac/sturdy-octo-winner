"use client"

import { cn } from "@/lib/tailwind"
import { useState } from "react"

export function Button(p: {
  loading?: boolean,
  disabled?: boolean,
}) {
  
  return <button className={ cn(
    "text-xs bg-indigo-60 h-7 py-0 px-6 mt-2 font-medium rounded-sm",

  ) }>

  </button>
}

export function TestButton() {
  const [loading, setLoading] = useState(false)

  return <Button>

  </Button>
}