import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { AppPageClient, FriendCount, TabsContentClient } from "./client"
import { HydrateState, getQueryClient } from "@/components/api/create-query"
import prisma from "@/lib/db/prisma"
import { Auth } from "@/lib/auth/auth-setup"
import { HydrationBoundary } from "@tanstack/react-query"
import { prefetchFriendList, prefetchFriendRequestList } from "../query"

interface Hello {

}

export default async function AppPage() {
  // fetch friends list
  // fetch pending
  // fetch add new friend
  
  await prefetchFriendList(async () => {
    return await prisma.user.findMany({ where: { friendsOf: { some: { id: (await Auth.getUserSession()).id } } } })
  })

  await prefetchFriendRequestList(async () => {
    return await prisma.friendRequest.findMany({ where: { toUserID: (await Auth.getUserSession()).id } })
  })

  const pageStyle = cn("px-4 pt-4 flex flex-col min-h-0")

  return (
    <HydrateState>
      <AppPageClient>
        <TabsContentClient value="all" className={pageStyle} >
          <AllFriendListServer />
        </TabsContentClient>
        <TabsContentClient value="pending" className={pageStyle}>

        </TabsContentClient>
        <TabsContentClient value="addfriend" className={pageStyle}>

        </TabsContentClient>
      </AppPageClient>
    </HydrateState>

  )
}

export function AllFriendListServer() {

  return (
    <>
      <input
        className="bg-black/30 rounded-md p-1.5 px-2.5 mb-4 placeholder:text-indigo-200/30 shrink-0"
        placeholder="Search"
      />
      <div className={cn(style.categoryTitle, "shrink-0")}>
        all friends - <FriendCount />
      </div>
      <div className="flex flex-col items-stretch overflow-y-scroll">
        {
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
            <div key={i} className={cn(
              "p-2 w-auto",
              "flex flex-row shrink-0",
              "gap-2",
              "rounded-md",
              "hover:bg-indigo-300/10"
            )}>
              <div className="w-9 h-9 rounded-full bg-black/30" />
              <div className="flex flex-col items-start">
                <div>
                  Friend A
                </div>
                <div className="text-xs leading-none text-indigo-100/40">
                  Status
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}