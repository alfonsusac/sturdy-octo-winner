import { AkarIconsHashtag } from "@/app/app/guild/[guildid]/page"
import { getUserGuildList } from "@/controller/user"
import { SVGProps } from "react"

export default async function GuildSidebar() {
  // const guildList = await getUserGuildList()
  return <div className="flex flex-col gap-px p-1.5">
    <div className="text-[0.65rem] font-semibold uppercase text-indigo-300/30 mt-2 mb-1 ml-2 flex justify-between items-center select-none gap-4">
      <div className="w-0 grow truncate">
        Text Channels aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </div>
      <div className="hover:text-indigo-100/90">
        <MaterialSymbolsAdd className="text-lg" />
      </div>
    </div>
    {
      [0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
        <a
          key={ i }
          className="group px-2 h-[1.9rem] text-[0.85rem] flex gap-1.5 items-center text-indigo-200/50 hover:bg-indigo-300/5 rounded-md select-none">
          <AkarIconsHashtag className="shrink-0 text-lg" />
          <div className="w-0 grow truncate group-hover:text-indigo-100/90">
            Channel Nameeeeeeeeeeeeeeeeeeeeeeeeee
          </div>
        </a>
      ))
    }
  </div>
}




export function MaterialSymbolsAdd(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>
  )
}