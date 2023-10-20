import { cn } from "@/lib/tailwind"
import React, { DOMAttributes } from "react"

export function Slot({ children, render, className, ...rest }: {
  children: React.ReactNode,
  render: number,
  className?: string,
} & DOMAttributes<any>) {

  // Can't have more than one children
  const maxIndex = React.Children.count(children) - 1
  const min = Math.min

  let Comp
  React.Children.forEach(children, (child, index) => {
    if (index === min(render, maxIndex)) {
      if (React.isValidElement(child)) {
        console.log(child.props.className)
        Comp = React.cloneElement(
          child,
          {
            className: cn(child.props.className, className),
            ...rest
          } as any)
      }
    }
  })

  return Comp

  // If valid element, then clone element
  // if (React.Children.count(children) > 1) {
  //   throw new Error("This Component can't contain more than one children!")
  // }

  // if (React.isValidElement(children)) {
  //   return React.cloneElement(children, {
  //     className: cn(children.props.className, className),
  //     ...rest
  //   } as any)
  // }

  return null
}