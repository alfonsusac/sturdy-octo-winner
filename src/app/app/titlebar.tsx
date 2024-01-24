import { cn } from "@/lib/tailwind"

export function TitleBar(p: {
  icon: React.ReactNode,
  title: React.ReactNode,
  subtitle?: React.ReactNode,
  menus?: React.ReactNode,
}) {
  return (
    <div className={ cn(
      "min-h-0 flex flex-col",
      "border-b-2 border-b-black/10",
      "flex flex-row items-center",
      "justify-between px-4 text-sm",
      "font-medium"
    ) }>
      <div className="flex flex-row items-center">
        <div className="mr-1.5 text-lg text-indigo-200/60">
          { p.icon }
        </div>
        <div>
          { p.title }
        </div>
        { p.subtitle && <>{ p.subtitle }</> }
      </div>
      <div className="shrink-0 flex flex-row">
        { p.menus }
      </div>
    </div>
  )
}