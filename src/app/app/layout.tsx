import * as client from "./layout.client"
import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { SVGProps } from "react"
import { getUserData } from "@/controller/user"
import AddServer from "./_modal/add-server"
import { Auth } from "@/lib/auth/next-auth"


export default async function AppLayout(p: {
  children: React.ReactNode
  innersidebar: React.ReactNode
  header: React.ReactNode
}) {
  const { session } = await Auth.getSession()
  const user = await getUserData()

  return (
    <client.Providers session={ session }>
      <client.BaseScreen>
        
        <Sidebar>
          <Home />
          <div className="w-1/2 h-px bg-indigo-300/20 self-center my-2" />
          <AddServer />
        </Sidebar>

        <SubSidebar>
          <div className="min-h-0 flex flex-col">{ p.innersidebar }</div>
          <client.UserStatus user={user} />
        </SubSidebar>

        <div className={ cn(style.cardbg, "grid grid-flow-row",
          "grid-rows-[2.75rem_1fr]",
          "text-sm",
          "min-h-0",
        ) }>
          { p.children }
        </div>
        
      </client.BaseScreen>
    </client.Providers>
  )
}

function Sidebar(p: {
  children?: React.ReactNode
}) {
  return (
    <div className={ cn(
      // cardbg,
      "h-auto",
      "flex flex-col",

    ) }>
      { p.children }
    </div>
  )
}

function Home() {
  return <client.SidebarItem
    icon={ <FluentHome12Filled /> }
    label={ <>Home</> }
    link={ ["/app", "/app/premium", "/app/message_request"] }
    strict={ true }
  />
}

function SubSidebar(p: {
  children?: React.ReactNode
}) {
  return (
    <div className={ cn(
      style.cardbg,
      "min-h-0",
      "grid grid-flow-row",
      "grid-rows-[minmax(0,_1fr)_3rem]"
    ) }>
      { p.children }
    </div>
  )
}

function FluentHome12Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" { ...props }><path fill="currentColor" d="M5.37 1.222a1 1 0 0 1 1.26 0l3.814 3.09A1.5 1.5 0 0 1 11 5.476V10a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1V7.5A.5.5 0 0 0 7 7H5a.5.5 0 0 0-.5.5V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.477a1.5 1.5 0 0 1 .556-1.166l3.815-3.089Z"></path></svg>
  )
}
