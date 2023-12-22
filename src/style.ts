import { cn } from "./lib/tailwind"

export const style = {
  buttonListItem: cn(
    "bg-transparent",
    "text-indigo-200/60",
    "transition-shadow",

    "hover:bg-indigo-300/10",
    "hover:text-indigo-200/60",

    "data-[state=active]:bg-indigo-300/20",
    "data-[state=active]:text-indigo-100/90",
    // "data-[state=active]:shadow-md",
    // "data-[state=active]:shadow-black/10",

    "data-[state=active]:hover:bg-indigo-300/20",
    "data-[state=active]:hover:text-indigo-100/90",

    "active:brightness-90",
  ),
  dialogFooter: cn(
    "p-4",
    "bg-black/10",
    "gap-2",
    "flex flex-row justify-end gap-2"
  ),
  dialogButton: cn(
    "text-sm",
    "font-medium",

    "transition-all",
    "rounded-md py-2 px-4 bg-indigo-300/20",
    "hover:bg-indigo-700",
    "hover:shadow-md",


    "disabled:saturate-50",
    "disabled:brightness-75",
    "disabled:pointer-events-none",


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
  ),
  inputLabel: cn(
    // "text-[0.7rem] uppercase font-semibold",
    // "my-1.5",
  ),
  textInput: cn(
    "p-2.5 px-3",
    "rounded-md",
    "bg-black/30",
  ),
  fileInput: cn(
    "transition-all",
    "file:bg-indigo-300/20 file:font-semibold",
    "file:hover:bg-indigo-700",
    "file:hover:shadow-md",
    "file:rounded-md",
    "file:border-0",
    "file:p-2 file:px-4",
  )
}