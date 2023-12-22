'use client'

import { signOut } from "next-auth/react"
import { Children, cloneElement, isValidElement } from "react"

export default function LogoutButton({ children }: {
  children: React.ReactNode
}) {
  if (!Children.only(children)) throw new Error('There can only be one children of LogoutButton')
  if (isValidElement(children))
    return cloneElement(
      children as React.ReactElement,
      {
        onClick: () => {
          signOut({ callbackUrl: "/auth" })
        }
      }
    )
}