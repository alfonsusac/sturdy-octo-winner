import { cn } from "@/lib/tailwind"
import { FluentPeople28Filled } from "../@innersidebar/default"
import { TitleBar } from "../titlebar"
import { style } from "@/style"
import { AppPageClient, TabsContentClient } from "./client"
import { QueryClient } from "@tanstack/react-query"
import { getQueryClient } from "@/components/api/create-query"
import prisma from "@/lib/db/prisma"
import { Auth } from "@/lib/auth/auth-setup"

interface Hello {

}

export default function AppPage() {
  // fetch friends list
  // fetch pending
  // fetch add new friend
  const qc = getQueryClient()
  qc.prefetchQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      return await prisma.user.findMany({ where: { friendsOf: { some: { id: (await Auth.getUserSession()).id } } } })
    }
  })
  qc.prefetchQuery({
    queryKey: ['friends-request'],
    queryFn: async () => {
      return await prisma.friendRequest.findMany({ where: { toUserID: (await Auth.getUserSession()).id } })
    }
  })


  return (
    <AppPageClient>
      <AllFriendListServer />
    </AppPageClient>
  )

  return (
    <>
      <TitleBar icon={<FluentPeople28Filled />} title="Friends" menus={<>Test</>} />
      <div className="px-4 pt-4 flex flex-col min-h-0">
        <input
          className="bg-black/30 rounded-md p-1.5 px-2.5 mb-4 max-w-none min-w-none block w-full"
          placeholder="Search"
        />
        <div className={cn(
          "my-2",
          style.categoryTitle,
          "uppercase",
        )}>
          online - {50}
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
      </div>
    </>
  )
}
const pageStyle = cn("px-4 pt-4 flex flex-col min-h-0")

export function AllFriendListServer() {

  return (
    <TabsContentClient value="all" className={pageStyle}>
      <input
        className="bg-black/30 rounded-md p-1.5 px-2.5 mb-4 placeholder:text-indigo-200/30 shrink-0"
        placeholder="Search"
      />
      <div className={cn(style.categoryTitle, "shrink-0")}>
        all friends - {50}
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
    </TabsContentClient>
  )
}