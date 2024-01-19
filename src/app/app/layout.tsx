import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { ReactNode, SVGProps } from "react"
import { getSessionUserData, getUserGuildList } from "@/controller/user"
import { Auth } from "@/lib/auth/auth-setup"
import { GuildHeader, GuildList, HomeButton, Providers, UserStatus } from "./client"
import { AddGuildDialog } from "../../components/modal/add-guild"
import { SidebarItem } from "@/components/parts/sidebar-item"
import prisma from "@/lib/db/prisma"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'


export default async function AppLayout(
  p: {
    children: React.ReactNode
    innersidebar: React.ReactNode
    header: React.ReactNode
  }
) {
  const { session } = await Auth.getUserSession()
  const user = await getSessionUserData()
  // const guildList = await getUserGuildList()

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['guilds'],
    queryFn: getUserGuildList,
  })

  return (
    <Providers session={ session }>

      <HydrationBoundary state={ dehydrate(queryClient) }>
        <Sidebar className="h-auto flex flex-col gap-2 overflow-y-scroll scrollbar-none">
          <HomeButton />
          <hr className="w-1/2 h-px border-indigo-300/20 self-center my-2" />
          <GuildList />
          <AddGuildDialog user={ user } trigger={
            <SidebarItem label="Add New Guild" icon={ <AddIcon className="text-2xl" /> } />
          } />
        </Sidebar>

        <SubSidebar className={ cn(style.cardbg, "grid grid-flow-row grid-rows-[minmax(0,_1fr)_3rem]") }>
          <div className="flex flex-col h-full">
            <GuildHeader />
            { p.innersidebar }
          </div>
          <UserStatus user={ user } />
        </SubSidebar>

        <div className={ cn(style.cardbg, "grid grid-flow-row grid-rows-[2.75rem_1fr] text-sm") }>
          { p.children }
        </div>
      </HydrationBoundary>

    </Providers>
  )
}

function AddIcon(props: SVGProps<SVGSVGElement>) {
  // FluentAdd16Filled
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" { ...props }><path fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5V2.75Z"></path></svg>)
}

const SubSidebar = "div"
const Sidebar = "div"