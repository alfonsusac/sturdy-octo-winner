import { AkarIconsHashtag } from "@/app/app/guild/[guildid]/page"
import { TooltipBase } from "@/components/base/tooltip"
import prisma from "@/lib/db/prisma"
import { SVGProps } from "react"

export default async function GuildSidebar(context: { params: { guildid: string } }) {
  // const guildList = await getUserGuildList()

  const channels = await prisma.channel.findMany({
    where: { guildId: context.params.guildid }
  })

  return <div className="flex flex-col gap-px p-1.5 h-0 grow overflow-auto">
    <div className="text-[0.65rem] font-semibold uppercase text-indigo-300/30 mt-2 mb-1 mx-1.5 flex justify-between items-center select-none gap-4 shrink-0">
      <div className="w-0 grow truncate">
        Text Channels aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </div>
      <TooltipBase content="Create Channel">
        <button className="hover:text-indigo-100/90 hover:bg-transparent">
          <MaterialSymbolsAdd className="text-lg" />
        </button>
      </TooltipBase>
    </div>
    {
      channels.map((ch, i) => (
        <a
          key={ i }
          className="group px-2 h-[1.9rem] text-[0.85rem] flex gap-1.5 items-center text-indigo-200/50 hover:bg-indigo-300/5 rounded-md select-none shrink-0">
          <AkarIconsHashtag className="shrink-0 text-lg" />
          <div className="w-0 grow truncate group-hover:text-indigo-100/90 lowercase">
            { ch.name }
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