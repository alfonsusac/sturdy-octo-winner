import { cn } from "@/lib/shared/tailwind"
import { style } from "@/style"
import { SVGProps } from "react"
import { getSessionUserData } from "@/controller/user"
import { GuildHeader, GuildList, HomeButton, ClientProviders, UserStatus } from "./client"
import { AddGuildDialog } from "../../components/features/add-guild/add-guild-modal"
import { SidebarItem } from "@/components/parts/sidebar-item"
import { prisma } from "@/lib/server/prisma"
import { HydrateState } from "@/components/api/create-query"
import { prepareGuildsQuery } from "./query"
import auth from "@/lib/server/auth"


export default async function AppLayout(
  props: {
    children: React.ReactNode
    innersidebar: React.ReactNode
    header: React.ReactNode
  }
) {
  const session = await auth.getRawSession()
  const user = await getSessionUserData()
  const guilds = await prisma.guild.findMany({
    where: { members: { some: { userId: user.id } } }
  })
  await prepareGuildsQuery(guilds)

  return (
    <div className="overflow-hidden">
      <ClientProviders session={session}>
        <HydrateState>
    
          <Sidebar className="h-auto flex flex-col gap-2 overflow-y-scroll scrollbar-none grow">
            <HomeButton />
            <hr className="w-1/2 h-px border-indigo-300/20 self-center my-2" />
            <GuildList />
            <AddGuildDialog user={user} trigger={
              <SidebarItem label="Add New Guild" icon={<AddIcon className="text-2xl" />} />
            } />
          </Sidebar>

          
          <SubSidebar className={cn(style.cardbg, "grid grid-flow-row grid-rows-[minmax(0,_1fr)_3rem]")}>
            <div className="flex flex-col h-full">
              <GuildHeader />
              {props.innersidebar}
            </div>
            <UserStatus user={user} />
          </SubSidebar>

          
          <div className={cn(style.cardbg, "text-sm flex flex-col shrink-0")}>
            {props.children}
          </div>

        </HydrateState>
      </ClientProviders>
    </div >
  )
}

function AddIcon(props: SVGProps<SVGSVGElement>) {
  // FluentAdd16Filled
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5V2.75Z"></path></svg>)
}

const SubSidebar = "div"
const Sidebar = "div"