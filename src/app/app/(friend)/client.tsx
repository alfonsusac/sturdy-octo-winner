"use client"

import { ReactNode, SVGProps } from "react"
import { FluentPeople28Filled } from "../@innersidebar/default"
import { TitleBar } from "../titlebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { cn } from "@/lib/shared/tailwind"
import { useFriendList } from "../query"
import Image from "next/image"

export function AppPageClient(
  props: {
    children: ReactNode
  }
) {

  return <Tabs className="flex flex-col h-0 grow" defaultValue="all">
    <TitleBar
      icon={<FluentPeople28Filled />}
      title="Friends"
      menus={<>Test</>}
    >
      <div className="mx-3 w-px self-stretch bg-indigo-200/20" />
      <TabsList className="flex gap-3">
        <TabsTrigger value="all" className={buttonStyle} >
          All
        </TabsTrigger>
        <TabsTrigger value="pending" className={buttonStyle}>
          Pending
        </TabsTrigger>
        <TabsTrigger value="addfriend"
          className={cn(buttonStyle,
            "bg-green-700/70 hover:bg-green-700/70",
            "data-[state=active]:bg-green-300/30",
            "data-[state=active]:hover:bg-green-300/30"
          )}>
          Add Friend
        </TabsTrigger>
      </TabsList>
    </TitleBar>
    {props.children}
  </Tabs>
}

const buttonStyle = cn(
  "px-2.5 py-1.5 hover:bg-indigo-200/10 data-[state=active]:bg-indigo-200/20 data-[state=active]:hover:bg-indigo-200/20"
)

export const TabsContentClient = TabsContent



// --

export function Client_FriendCount() {
  const { data } = useFriendList()
  return data ? data.length : undefined
}

export function Client_FriendList(
  props: { }
) {
  const { data } = useFriendList()
  return (
    <>
      {
        data?.map((user) => (
          <FriendListItemStatic
            key={user.id}
            image={user.profilePicture}
            name={user.displayName}
          />
        ))
      }
    </>
  )
}

export function FriendListItemStatic(
  props: {
    image: string,
    name: string,
  }
) {
  return (
    <div className="flex-none p-2 rounded-md
      hover:bg-indigo-300/10
      flex gap-2
    ">
      <div className="w-9 h-9 rounded-full bg-black/30">
        <Image unoptimized alt="Profile picture" width={24} height={24} src={props.image} />
      </div>
      <div className="flex-auto flex flex-col items-start">
        <div>
          {props.name}
        </div>
        <div className="text-xs leading-none text-indigo-100/40">
          Idle
        </div>
      </div>
      <div className="flex-none flex gap-2">
        <div>
          <BiThreeDots />
        </div>
      </div>
    </div>
  )
}


export function BiThreeDots(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="currentColor" d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3"></path></svg>
  )
}
