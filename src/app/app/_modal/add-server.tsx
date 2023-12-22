import { getUserData } from "@/controller/user"
import { AddServerDialog } from "./add-server.client"
import { SVGProps } from "react"
import { SidebarItem } from "../layout.client"

export default async function AddServer() {
  const user = await getUserData()

  return (
    <AddServerDialog user={user} /** use client */>
      <SidebarItem 
        icon={ <FluentAdd16Filled className="text-2xl" /> }
        label={ <>Add New Server</> }
      />
    </AddServerDialog>
  )
}

export function FluentAdd16Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" { ...props }><path fill="currentColor" d="M8.5 2.75a.75.75 0 0 0-1.5 0V7H2.75a.75.75 0 0 0 0 1.5H7v4.25a.75.75 0 0 0 1.5 0V8.5h4.25a.75.75 0 0 0 0-1.5H8.5V2.75Z"></path></svg>
  )
}