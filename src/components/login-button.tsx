"use client"

import { Slot } from "@radix-ui/react-slot"
import { signIn } from "next-auth/react"
import { ComponentProps, ComponentPropsWithoutRef, useState } from "react"

export function LoginViaGoogle(p: ComponentPropsWithoutRef<"button">) {

  return <Slot
    onClick={ (e) => {
      signIn('google', {
        callbackUrl: '/app'
      })
      e.currentTarget.setAttribute('disabled', 'true')
      e.currentTarget.innerHTML = "Connecting to Google..."
    } }
    { ...p }
  />
}

export function LoginLocalDev(p: ComponentPropsWithoutRef<"button">) {
  return <Slot
    onClick={ () => signIn("credentials", {
      // redirect: false,
      callbackUrl: '/app'
    }, {}) }
    {...p}
  />
}