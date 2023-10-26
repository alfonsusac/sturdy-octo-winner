import { cn } from "./lib/tailwind"

export const style = {
  buttonListItem: cn(
    "text-indigo-200/60",
    "transition-shadow",

    "hover:bg-indigo-300/10",
    "hover:text-indigo-200/60",

    "data-[state=active]:bg-indigo-300/20",
    "data-[state=active]:text-indigo-100/90",
    "data-[state=active]:shadow-md",
    "data-[state=active]:shadow-black/10",

    "active:brightness-90",
  ),
  dialogFooter: cn(
    "p-4",
    "bg-black/10",
    "gap-2",
    "flex flex-row justify-end gap-2"
  ),
  dialogButton: cn(
    "transition-all",
    "rounded-md py-2 px-4 bg-indigo-300/20 font-semibold",
    "hover:bg-indigo-700",
    "hover:shadow-md", 
  ),

  categoryTitle: cn(
    "text-[0.7rem]",
    "text-indigo-300/40",
    "font-semibold",
    "uppercase",
    "select-none",
    
  ),
  cardbg: cn(
    'rounded-lg bg-indigo-300/5'
  )
}