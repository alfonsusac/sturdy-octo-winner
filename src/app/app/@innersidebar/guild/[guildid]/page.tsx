import { AkarIconsHashtag } from "@/app/app/guild/[guildid]/page"
import { TooltipBase } from "@/components/base/tooltip"
import prisma from "@/lib/db/prisma"
import { cn } from "@/lib/tailwind"
import { ComponentProps, ReactNode, SVGProps } from "react"
import { ChannelListItem, ChannelListItemButton } from "./client"

export default async function GuildSidebar(
  context: {
    params: {
      guildid: string
    }
  }
) {
  // const guildList = await getUserGuildList()

  const channels = await prisma.channel.findMany({
    where: { guildId: context.params.guildid }
  })

  return <div className="flex flex-col gap-px p-1.5 h-0 grow overflow-auto">

    <ChannelListItem path={`/app/guild/${context.params.guildid}`}>
      <MaterialSymbolsHouseRounded className="shrink-0 text-lg" />
      <div className="w-0 grow truncate group-hover:text-indigo-100/90">
        Home
      </div>
    </ChannelListItem>

    <div className="text-[0.65rem] font-semibold uppercase text-indigo-300/30 mt-2 mb-0.5 mx-1.5 flex justify-between items-center select-none gap-4 shrink-0">
      <div className="w-0 grow truncate">
        Text Channels
      </div>
      <TooltipBase content="Create Channel">
        <button className="hover:text-indigo-100/90 hover:bg-transparent">
          <MaterialSymbolsAdd className="text-lg" />
        </button>
      </TooltipBase>
    </div>

    {
      channels.map((ch, i) => (
        <ChannelListItem key={ i } path={ `/app/guild/${context.params.guildid}/${ch.id}` }>
          <AkarIconsHashtag className="shrink-0 text-lg" />
          <div className="w-0 grow truncate group-hover:text-indigo-100/90 lowercase">
            { ch.name }
          </div>
        </ChannelListItem>
      ))
    }

  </div>
}

export function ChannelListItemServer(
  { className, ...rest }: ComponentProps<"button">
) {
  return (
    <button
      className={ cn(
        "group px-2 h-[1.9rem] text-[0.85rem] rounded-md select-none leading-normal",
        "flex gap-1.5 items-center",
        "text-indigo-200/50 hover:bg-indigo-300/5 shrink-0 text-left duration-75",
        "data-[selected=true]:bg-indigo-200/10",
        "data-[selected=true]:text-white",
        className
      ) }
      { ...rest }
    />
  )
}






export function MaterialSymbolsHouseRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M10 20H6q-.425 0-.712-.288T5 19v-7H3.3q-.35 0-.475-.325t.15-.55l8.35-7.525q.275-.275.675-.275t.675.275L16 6.6V4.5q0-.2.15-.35T16.5 4h2q.2 0 .35.15t.15.35v4.8l2.025 1.825q.275.225.15.55T20.7 12H19v7q0 .425-.288.713T18 20h-4v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15zm0-9.975h4q0-.8-.6-1.313T12 8.2q-.8 0-1.4.513t-.6 1.312"></path></svg>
  )
}
export function MaterialSymbolsAdd(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg>
  )
}