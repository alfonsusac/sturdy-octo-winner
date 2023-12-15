import { cn } from "@/lib/tailwind"



export function AppLogo(p: {
  className?: string
  hideText?: boolean
}) {
  return (
    <div className={ cn(
      "flex flex-row gap-1.5 items-center select-none",
      p.className
    ) }>
      <div className="text-indigo-500 text-[1.8em]">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="currentColor"><path d="m13.629 20.472l-.542.916c-.483.816-1.69.816-2.174 0l-.542-.916c-.42-.71-.63-1.066-.968-1.262c-.338-.197-.763-.204-1.613-.219c-1.256-.021-2.043-.098-2.703-.372a5 5 0 0 1-2.706-2.706C2 14.995 2 13.83 2 11.5v-1c0-3.273 0-4.91.737-6.112a5 5 0 0 1 1.65-1.651C5.59 2 7.228 2 10.5 2h3c3.273 0 4.91 0 6.113.737a5 5 0 0 1 1.65 1.65C22 5.59 22 7.228 22 10.5v1c0 2.33 0 3.495-.38 4.413a5 5 0 0 1-2.707 2.706c-.66.274-1.447.35-2.703.372c-.85.015-1.275.022-1.613.219c-.338.196-.548.551-.968 1.262Z" opacity=".5"></path><path d="M10.99 14.308c-1.327-.978-3.49-2.84-3.49-4.593c0-2.677 2.475-3.677 4.5-1.609c2.025-2.068 4.5-1.068 4.5 1.609c0 1.752-2.163 3.615-3.49 4.593c-.454.335-.681.502-1.01.502c-.329 0-.556-.167-1.01-.502Z"></path></g></svg>
      </div>
      {
        !p.hideText && <div className="block font-semibold font-logo text-white tracking-normal">
          Diskott
        </div>
      }
    </div>
  )
}