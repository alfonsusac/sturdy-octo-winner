import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { AppPageClient, Client_FriendCount, Client_FriendList, TabsContentClient } from "./client"
import { HydrateState } from "@/components/api/create-query"
import { prisma } from "@/lib/server/prisma"
import { prepareFriendListQuery, prepareFriendRequestListQuery } from "../query"
import auth from "@/lib/server/auth"

export default async function AppPage() {
  // fetch friends list
  // fetch pending
  // fetch add new friend

  await prepareFriendRequestListQuery(async () => {
    return await prisma.friendRequest.findMany({ where: { toUserID: (await auth.getSession()).id } })
  })

  const pageStyle = cn("px-4 pt-4 flex flex-col min-h-0")

  return (
    <HydrateState>
      <AppPageClient>

        <TabsContentClient value="all" className={pageStyle}>
          <AllFriendList />
        </TabsContentClient>

        <TabsContentClient value="pending" className={pageStyle}>
          <AllFriendRequests />
        </TabsContentClient>

        <TabsContentClient value="addfriend" className={pageStyle}>

        </TabsContentClient>

      </AppPageClient>
    </HydrateState>

  )
}

async function AllFriendList() {

  const friendList = await prisma.user.findMany({ where: { friendsOf: { some: { id: (await auth.getSession()).id } } } })
  await prepareFriendListQuery(friendList)

  return (
    <HydrateState>
      <input
        className="bg-black/30 rounded-md p-1.5 px-2.5 mb-4 placeholder:text-indigo-200/30 shrink-0"
        placeholder="Search"
      />
      <div className={cn(style.categoryTitle, "shrink-0")}>
        all friends - <Client_FriendCount />
      </div>
      <div className="flex flex-col items-stretch overflow-y-scroll">
        <Client_FriendList />
      </div>
    </HydrateState>
  )
}

async function AllFriendRequests() {

  const friendRequests = await prisma.friendRequest.findMany({ where: { toUserID: (await auth.getSession()).id } })
  await prepareFriendRequestListQuery(friendRequests)

  return (
    <HydrateState>
      {
        friendRequests.map((data) => (
          <div key={data.id} className="flex-none p-2 rounded-md
            hover:bg-indigo-300/10
            flex gap-2
          ">
            {
              JSON.stringify(data)
            }
          </div>
        ))
      }
    </HydrateState>
  )

  
}

async function AddFriendPage() {
  


}