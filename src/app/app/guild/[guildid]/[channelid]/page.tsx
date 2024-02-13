import { TitleBar } from "@/app/app/titlebar"
import { AkarIconsHashtag } from "../page"
import { prisma } from "@/lib/server/prisma"
import { ChatInput, ChatInputField, MessageList } from "./client"
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

  prepareChannelMessages([channelid],
    async () => await prisma.message.findMany({
      where: { channelId: channelid },
      orderBy: { created_at: 'desc' }
    })
  )

  return (
    <HydrateState>
      <TitleBar icon={<AkarIconsHashtag />} title="Channel" />
      <div className="h-full w-full flex flex-col pb-6">

        <MessageList channelid={channelid} />

        <ChatInput>
          <ChatInputField channelid={channelid} />
        </ChatInput>
        
      </div>
    </HydrateState>
  )
}
