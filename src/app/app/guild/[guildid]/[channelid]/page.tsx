import { TitleBar } from "@/app/app/titlebar"
import { AkarIconsHashtag } from "../page"
import { MaterialSymbolsAdd } from "@/app/app/@innersidebar/guild/[guildid]/page"
import prisma from "@/lib/db/prisma"
import { Suspense } from "react"
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
    <div className="h-full w-full flex flex-col gap-2 pl-4 pr-2 pb-6">

      {/* <Suspense> */}
        <MessageListServer channelid={ context.params.channelid } />
      {/* </Suspense> */}
      {/* Chat list */ }
      {/* <div className="h-0 grow w-full flex flex-col bg-yellow-500/40 p-2 overflow-auto gap-2">
        {
          [0, 0, 0, 0, 0, 0, 0].map((_, i) => <div key={ i } className=" shrink-0 h-8 w-full bg-red-500/40">

          </div>)
        }
        <Suspense>
          <ChatList channelid={ context.params.channelid } />
        </Suspense>
      </div> */}


      {/* Input */ }
      <div className="shrink-0 w-auto h-11 bg-black/20 rounded-lg mr-2 px-4
        flex flex-row gap-2 items-center
        focus-within:outline
        focus-within:outline-4
        focus-within:outline-indigo-300/10
      ">
        <div className="text-xl bg-indigo-300/10 rounded-full p-1">
          <MaterialSymbolsAdd className="text-indigo-200/80" />
        </div>
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
  // const messages = await prisma.message.findMany({
  //   where: {
  //     channelId: props.channelid
  //   }
  // })

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['channel-messages'],
    queryFn: async () => {
      const datas = await prisma.message.findMany({
        where: {
          channelId: props.channelid
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