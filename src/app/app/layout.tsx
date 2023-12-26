import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { SVGProps } from "react"
import { getSessionUserData } from "@/controller/user"
import { Auth } from "@/lib/auth/auth-setup"
import { Providers, UserStatus } from "./client"
import { BaseScreen } from "./screen"
import { AddServerDialog } from "../../components/modal/add-server"
import { SidebarItem } from "@/components/sidebar-item"
import { redirect } from "next/navigation"


export default async function AppLayout(p: {
  children: React.ReactNode
  innersidebar: React.ReactNode
  header: React.ReactNode
}) {
  const { session } = await Auth.getUserSession()
  const user = await getSessionUserData() // for user status

  return (
    <Providers session={ session }>
      <BaseScreen>

        <Sidebar className="h-auto flex flex-col">
          <HomeButton />
          <div className="w-1/2 h-px bg-indigo-300/20 self-center my-2" />
          <AddServerButton />
        </Sidebar>

        <SubSidebar className={ cn(style.cardbg, "min-h-0 grid grid-flow-row grid-rows-[minmax(0,_1fr)_3rem]") }>
          <div className="min-h-0 flex flex-col">{ p.innersidebar }</div>
          <UserStatus user={ user } />
        </SubSidebar>

        <div className={ cn(style.cardbg, "grid grid-flow-row grid-rows-[2.75rem_1fr] text-sm min-h-0") }>
          { p.children }
        </div>

      </BaseScreen>
    </Providers>
  )
}

// ※ Home Button
//  thats on the Sidebar

function HomeButton() {
  return <SidebarItem label="Home" urlpattern="/app*">
    <FluentHome12Filled />
  </SidebarItem>
}
function FluentHome12Filled(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" { ...props }><path fill="currentColor" d="M5.37 1.222a1 1 0 0 1 1.26 0l3.814 3.09A1.5 1.5 0 0 1 11 5.476V10a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1V7.5A.5.5 0 0 0 7 7H5a.5.5 0 0 0-.5.5V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.477a1.5 1.5 0 0 1 .556-1.166l3.815-3.089Z"></path></svg>)
}

// ※ Add Server Button
//  thats on the Sidebar

async function AddServerButton() {
  const user = await getSessionUserData()
  return (
    <AddServerDialog user={ user } /** use client */>
      <SidebarItem label={ <>Add New Server</> }>
        <FluentAdd16Filled className="text-2xl" />
      </SidebarItem>
    </AddServerDialog>
  )
}
function FluentAdd16Filled(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" { ...props }><path fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5V2.75Z"></path></svg>)
}


const Sidebar = "div"
const SubSidebar = "div"