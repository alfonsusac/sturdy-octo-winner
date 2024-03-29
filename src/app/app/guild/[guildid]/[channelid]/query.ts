import { createQuery } from "@/components/api/create-query"
import { Message } from "@prisma/client"

export const {
  prefetch: prepareChannelMessages,
  useHook: useChannelMessages,
  mutations
} = createQuery<Message[]>()
  (
    (channelid: string) => ['channel', channelid, 'messages']
  )({

    addMessage: (prev) =>
      (newData: Message) => [newData, ...prev],

  })


// const e = createQuery<Message[]>()
//   (
//     (channelid: string) => ['channel', channelid, 'messages']
//   )(
//     {
//       addGuild: (prev) =>
//         (newData: Message) => [...prev, newData],

//       removeGuild: (prev) =>
//         (id: string) => prev.filter(g => g.id !== id)
//     }
//   )


// const e = createQuery<Message[]>()
//   (['messages'])()


// const f = createQuery<Message>()
//   ((id: string)=>['messages', id])()

// e.prefetch(async () => [])