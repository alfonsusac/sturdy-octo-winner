import { TitleBar } from "@/app/app/titlebar"
import { AkarIconsHashtag } from "../page"
import { prisma } from "@/lib/server/prisma"
import { ChatInput, MessageList } from "./client"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

export default async function Channel(
  context: {
    params: {
      guildid: string,
      channelid: string,
    }
  }
) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['channel'],
    queryFn: async () => {
      return await prisma.channel.findUnique({
        where: {
          id: context.params.channelid
        }
      })
    },
  })

  return <HydrationBoundary state={ dehydrate(queryClient) }>
    <TitleBar icon={ <AkarIconsHashtag /> } title="Channel" menus={ <></> } />
    <div className="h-full w-full flex flex-col pb-6">

      <MessageListServer channelid={ context.params.channelid } />

      {/* Input */ }
      <div className="shrink-0 w-auto -mt-1 bg-[#212231] rounded-lg px-4
        flex flex-row gap-2 items-center
        focus-within:outline
        focus-within:outline-4
        focus-within:outline-indigo-300/10
        shadow-xl mx-4 z-[1]
      ">
        {/* <div className="text-xl bg-indigo-300/10 rounded-full p-1">
          <MaterialSymbolsAdd className="text-indigo-200/80" />
        </div> */}
        <ChatInput channelid={ context.params.channelid } />
      </div>
    </div>
  </HydrationBoundary>
}


async function MessageListServer(
  props: {
    channelid: string
  }
) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['channel-messages'],
    queryFn: async () => {
      const datas = await prisma.message.findMany({
        where: {
          channelId: props.channelid
        },
        orderBy: {
          created_at: 'desc'
        }
      })
      return datas
    },
  })

  return (
    <HydrationBoundary state={ dehydrate(queryClient) }>
      <MessageList />
    </HydrationBoundary>
  )
}