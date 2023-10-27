'use client'

import { signOut } from "next-auth/react"
import { Children, cloneElement, isValidElement } from "react"

export default function LogoutButton(p: {
  children: React.ReactNode
}) {
  const { children } = p

  if (!Children.only(children)) throw new Error('There can only be one children of LogoutButton')

  if (isValidElement(p.children))
    return cloneElement(
      p.children as React.ReactElement,
      {
        onClick: () => {
          signOut({
            callbackUrl: "/auth"
          })
        }
      }
    )
}