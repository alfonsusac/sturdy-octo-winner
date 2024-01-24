import { cn } from "@/lib/tailwind"
import { ReactNode } from "react"

export function TitleBar(
  props: {
    icon: React.ReactNode,
    title: React.ReactNode,
    // subtitle?: React.ReactNode,
    menus?: React.ReactNode,
    children?: React.ReactNode,
  }
) {
  return (
    <div className={ cn(
      "flex flex-col h-11 shrink-0",
      "border-b-2 border-b-black/10",
      "flex flex-row items-center",
      "justify-between px-4 text-sm",
      "font-medium"
    ) }>
      <div className="flex flex-row items-center">
        <div className="mr-1.5 text-lg text-indigo-200/60">
          { props.icon }
        </div>
        <div>
          { props.title }
        </div>
        { props.children }
      </div>
      <div className="shrink-0 flex flex-row">
        { props.menus }
      </div>
    </div>
  )
}
export function TitleBarIcon(
  props: {
    children: ReactNode
  }
) {
  return <div className="mr-1.5 text-lg text-indigo-200/60">
    {props.children}
  </div>
}

export function TitleBarTitle(
  props: {
    children: ReactNode
  }
) {
  return <div className="">
    {props.children}
  </div>
}