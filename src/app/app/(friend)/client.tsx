"use client"

import { ReactNode } from "react"
import { FluentPeople28Filled } from "../@innersidebar/default"
import { TitleBar } from "../titlebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { cn } from "@/lib/tailwind"

export function AppPageClient(
  props: {
    children: ReactNode
  }
) {

  return <Tabs className="flex flex-col h-0 grow" defaultValue="all">
    <TitleBar
      icon={ <FluentPeople28Filled /> }
      title="Friends"
      menus={<>Test</>}
    >
      <div className="mx-3 w-px self-stretch bg-indigo-200/20"/>
      <TabsList className="flex gap-3 

      ">
        <TabsTrigger value="all"
          className={ buttonStyle }
        >
          All
        </TabsTrigger>
        <TabsTrigger value="pending"
          className={ buttonStyle }
        >
          Pending
        </TabsTrigger>
        <TabsTrigger value="addfriend"
          className={ cn(buttonStyle,
            "bg-green-700/70 hover:bg-green-700/70",
            "data-[state=active]:bg-green-300/30",
            "data-[state=active]:hover:bg-green-300/30"
          ) }
        >
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

