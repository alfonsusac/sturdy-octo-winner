/* eslint-disable @next/next/no-img-element */
"use client"

import { useSession } from "@/lib/auth/next-auth.client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode, SVGProps, useState } from "react"
import UserSettingView from "../../components/menu/userSetting"
import { Guild, User } from "@prisma/client"
import { BaseScreen } from "./screen"
import { SidebarItem } from "@/components/parts/sidebar-item"


// -------------------------------------------
// ※ Providers
// -------------------------------------------

export function Providers(p: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={ p.session }>
      <BaseScreen>
        { p.children }
      </BaseScreen>
    </SessionProvider>
  )
}



// -------------------------------------------
// ※ User Status
// -------------------------------------------

export function UserStatus(p: {
  user: User
}) {
  const session = useSession()
  return (
    <div className="min-w-0 bg-black/30 h-12 p-2.5 rounded-b-lg flex flex-row gap-2 items-center flex-1">
      <div className="h-full aspect-square rounded-full overflow-hidden bg-black/50 shrink-0">
        <img src={ session.data?.user?.image ?? "" } alt="Current user's profile picture" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 leading-[0.8] justify-center">
        <div className="text-[0.8rem] text-indigo-100/90 font-semibold truncate shrink min-w-0 flex-1">
          { session.data?.user?.name ?? "" }
        </div>
        <div className="text-[0.7rem] text-indigo-100/60">
          status
        </div>
      </div>
      <UserSettingView>
        <button className="w-6 h-6 p-0 flex justify-center items-center text-lg text-indigo-200/40 hover:bg-indigo-400/10 shrink-0">
          <FluentSettings28Filled />
        </button>
      </UserSettingView>
    </div>
  )

}

export function FluentSettings28Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28" { ...props }><path fill="currentColor" d="M16.693 2.311A12.974 12.974 0 0 0 14.013 2c-.924.01-1.823.115-2.704.311a.923.923 0 0 0-.716.8l-.209 1.877a1.707 1.707 0 0 1-2.371 1.376l-1.72-.757a.92.92 0 0 0-1.043.214a12.059 12.059 0 0 0-2.709 4.667a.924.924 0 0 0 .334 1.017l1.527 1.125a1.701 1.701 0 0 1 0 2.74l-1.527 1.128a.924.924 0 0 0-.334 1.016a12.064 12.064 0 0 0 2.707 4.672a.92.92 0 0 0 1.043.215l1.728-.759a1.694 1.694 0 0 1 1.526.086c.466.27.777.745.838 1.281l.208 1.877a.923.923 0 0 0 .702.796a11.67 11.67 0 0 0 5.413 0a.923.923 0 0 0 .702-.796l.208-1.88a1.693 1.693 0 0 1 2.366-1.37l1.727.759a.92.92 0 0 0 1.043-.215a12.065 12.065 0 0 0 2.707-4.667a.924.924 0 0 0-.334-1.017L23.6 15.37a1.701 1.701 0 0 1-.001-2.74l1.525-1.127a.924.924 0 0 0 .333-1.016a12.057 12.057 0 0 0-2.708-4.667a.92.92 0 0 0-1.043-.214l-1.72.757a1.666 1.666 0 0 1-.68.144a1.701 1.701 0 0 1-1.688-1.518l-.21-1.879a.922.922 0 0 0-.714-.799ZM14 18a4 4 0 1 1 0-8a4 4 0 0 1 0 8Z"></path></svg>
  )
}



// -------------------------------------------
// ※ Guild List
// -------------------------------------------

export let addServerToList: ((guild: Guild) => void)
export let removeServerFromList: ((id: string) => void)

export function GuildList(
  props: {
    children: ReactNode
    prefetchedData: Guild[]
  }
) {
  const [guilds, setGuilds] = useState(props.prefetchedData)

  addServerToList = (guild) => {
    if (guilds.find(g => g.id === guild.id)) return
    setGuilds(prev => [...prev, guild])
  }

  removeServerFromList = (id) => {
    if (guilds.find(g => g.id == id)) {
      setGuilds(prev => prev.filter(g => g.id !== id))
    }
  }



  // updateServerList = () => {
  //   console.log("ServerList Update Test")
  //   setGuilds(prev => [...prev, {
  //     id: crypto.randomUUID(),
  //     name: "Hello",
  //     ownerUserId: "asd",
  //     profilePicture: true
  //   }])
  // }

  // serverList.update = () => {
  //   console.log("ServerList Update Test")
  //   setGuilds(prev => [...prev, {
  //     id: crypto.randomUUID(),
  //     name: "Hello",
  //     ownerUserId: "asd",
  //     profilePicture: true
  //   }])
  // }

  return (
    <>
      {
        guilds.map((guild, i) => (
          <SidebarItem
            className={
              "bg-indigo-300/10 rounded-2xl hover:rounded-xl hover:bg-indigo-600 transition-all select-none font-medium text-sm"
            }

            label={ guild.name }
            key={ i }
            icon={
              !guild.profilePicture
                ? guild.name.split(' ').map(str => str[0]).slice(0, 2).join('')
                : <img src={`https://diskott-avatars.s3.ap-southeast-1.amazonaws.com/server/${guild.id}.webp`}/>
              }
          />
        ))
      }
    </>
  )

}


export function DefaultServerIcon(props: SVGProps<SVGSVGElement>) {
  // RiCommunityFill
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" { ...props }><path fill="currentColor" fillRule="evenodd" d="M7 0a4.5 4.5 0 0 0-2.977 7.875c.337.297.528.66.55 1.024c.021.355-.113.788-.572 1.247c-.558.558-1.35.757-1.978.623a1.322 1.322 0 0 1-.734-.407C1.119 10.168 1 9.89 1 9.5a.5.5 0 0 0-1 0v.828c0 .844.299 1.618.796 2.223a.622.622 0 0 1 .28.156l.003.004a1.516 1.516 0 0 0 .274.176c.213.106.552.222 1.022.222c1.505 0 2.525-1.24 2.963-2.34a.625.625 0 0 1 1.161.462c-.34.857-1.048 1.956-2.149 2.597h5.3c-1.101-.641-1.808-1.74-2.15-2.597a.625.625 0 1 1 1.162-.462c.438 1.1 1.458 2.34 2.963 2.34c.47 0 .809-.116 1.021-.223a1.522 1.522 0 0 0 .275-.175l.003-.004a.623.623 0 0 1 .28-.156A3.485 3.485 0 0 0 14 10.328V9.5a.5.5 0 1 0-1 0c0 .39-.12.668-.289.862c-.173.199-.425.34-.735.407c-.628.134-1.419-.065-1.977-.623c-.46-.46-.593-.892-.572-1.247c.022-.365.213-.727.55-1.024A4.5 4.5 0 0 0 7 0m-.964 5.25a.786.786 0 1 1-1.572 0a.786.786 0 0 1 1.572 0m2.714.786a.786.786 0 1 0 0-1.572a.786.786 0 0 0 0 1.572" clipRule="evenodd"></path></svg>
  )
}


export function StreamlineOctopusSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" { ...props }><path fill="currentColor" fillRule="evenodd" d="M7 0a4.5 4.5 0 0 0-2.977 7.875c.337.297.528.66.55 1.024c.021.355-.113.788-.572 1.247c-.558.558-1.35.757-1.978.623a1.322 1.322 0 0 1-.734-.407C1.119 10.168 1 9.89 1 9.5a.5.5 0 0 0-1 0v.828c0 .844.299 1.618.796 2.223a.622.622 0 0 1 .28.156l.003.004a1.516 1.516 0 0 0 .274.176c.213.106.552.222 1.022.222c1.505 0 2.525-1.24 2.963-2.34a.625.625 0 0 1 1.161.462c-.34.857-1.048 1.956-2.149 2.597h5.3c-1.101-.641-1.808-1.74-2.15-2.597a.625.625 0 1 1 1.162-.462c.438 1.1 1.458 2.34 2.963 2.34c.47 0 .809-.116 1.021-.223a1.522 1.522 0 0 0 .275-.175l.003-.004a.623.623 0 0 1 .28-.156A3.485 3.485 0 0 0 14 10.328V9.5a.5.5 0 1 0-1 0c0 .39-.12.668-.289.862c-.173.199-.425.34-.735.407c-.628.134-1.419-.065-1.977-.623c-.46-.46-.593-.892-.572-1.247c.022-.365.213-.727.55-1.024A4.5 4.5 0 0 0 7 0m-.964 5.25a.786.786 0 1 1-1.572 0a.786.786 0 0 1 1.572 0m2.714.786a.786.786 0 1 0 0-1.572a.786.786 0 0 0 0 1.572" clipRule="evenodd"></path></svg>
  )
}