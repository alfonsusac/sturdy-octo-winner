import { TitleBar } from "@/app/app/titlebar"
import { AkarIconsHashtag } from "../page"
import { prisma } from "@/lib/server/prisma"
import { ChatInput, MessageList } from "./client"
import { HydrateState, prepareQuery } from "@/components/api/create-query"
import { prepareChannelMessages } from "./query"

export default async function Channel(
  context: {
    params: {
      guildid: string,
      channelid: string,
    }
  }
) {
  const { channelid } = context.params

  const channelMessages = await prisma.message.findMany({
    where: {
      channelId: channelid
    },
    orderBy: {
      created_at: 'desc'
    }
  })
  
  prepareChannelMessages(channelid, channelMessages)

  return (
    <HydrateState>
      <TitleBar icon={<AkarIconsHashtag />} title="Channel"/>

      <div className="h-full w-full flex flex-col pb-6">

        <MessageList channelid={channelid} />

        {/* Input */}
        <div className="shrink-0 w-auto -mt-1 bg-[#212231] rounded-lg px-4
          flex flex-row gap-2 items-center
          focus-within:outline
          focus-within:outline-4
          focus-within:outline-indigo-300/10
          shadow-xl mx-4 z-[1]
        ">
          <ChatInput channelid={channelid} />
        </div>

      </div>

    </HydrateState>
  )
}
