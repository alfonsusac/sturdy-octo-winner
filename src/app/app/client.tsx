/* eslint-disable @next/next/no-img-element */
"use client"

import { useSession } from "@/lib/auth/next-auth.client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ReactNode, SVGProps, useEffect, useState } from "react"
import UserSettingView from "../../components/setting-menu/userSetting"
import { Guild, User } from "@prisma/client"
import { BaseScreen } from "./screen"
import { SidebarItem } from "@/components/parts/sidebar-item"
import { useParams, usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { cn } from "@/lib/tailwind"
import { DropdownBase, DropdownItem } from "@/components/base/dropdown"
import GuildSettingView from "@/components/setting-menu/guildSetting"
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query"
import { runServer } from "@/lib/serveraction/return"
import { s_deleteGuild } from "@/actions/crud-guild"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createQuery } from "@/components/api/create-query"
import { useGuild, useGuilds } from "./query"
// import { useGuilds } from "./layout"



// -------------------------------------------
// ※ Providers
// -------------------------------------------


export function ClientProviders(p: {
  children: React.ReactNode
  session: Session | null
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000, // 1 minute
          },
        },
      }),
  )

  return (
    <SessionProvider session={p.session}>
      <BaseScreen>
        <QueryClientProvider client={queryClient}>
          {p.children}
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
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
        <img src={session.data?.user?.image ?? ""} alt="Current user's profile picture" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 leading-[0.8] justify-center grow">
        <div className="text-[0.8rem] text-indigo-100/90 font-medium truncate shrink min-w-0 flex-1">
          {session.data?.user?.name ?? ""} hhhhhhhhhhhhhhhhhhhhhhhhhhh
        </div>
        <div className="text-[0.7rem] text-indigo-100/60 truncate">
          status hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
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
  // FluentSettings28Filled
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28" {...props}><path fill="currentColor" d="M16.693 2.311A12.974 12.974 0 0 0 14.013 2c-.924.01-1.823.115-2.704.311a.923.923 0 0 0-.716.8l-.209 1.877a1.707 1.707 0 0 1-2.371 1.376l-1.72-.757a.92.92 0 0 0-1.043.214a12.059 12.059 0 0 0-2.709 4.667a.924.924 0 0 0 .334 1.017l1.527 1.125a1.701 1.701 0 0 1 0 2.74l-1.527 1.128a.924.924 0 0 0-.334 1.016a12.064 12.064 0 0 0 2.707 4.672a.92.92 0 0 0 1.043.215l1.728-.759a1.694 1.694 0 0 1 1.526.086c.466.27.777.745.838 1.281l.208 1.877a.923.923 0 0 0 .702.796a11.67 11.67 0 0 0 5.413 0a.923.923 0 0 0 .702-.796l.208-1.88a1.693 1.693 0 0 1 2.366-1.37l1.727.759a.92.92 0 0 0 1.043-.215a12.065 12.065 0 0 0 2.707-4.667a.924.924 0 0 0-.334-1.017L23.6 15.37a1.701 1.701 0 0 1-.001-2.74l1.525-1.127a.924.924 0 0 0 .333-1.016a12.057 12.057 0 0 0-2.708-4.667a.92.92 0 0 0-1.043-.214l-1.72.757a1.666 1.666 0 0 1-.68.144a1.701 1.701 0 0 1-1.688-1.518l-.21-1.879a.922.922 0 0 0-.714-.799ZM14 18a4 4 0 1 1 0-8a4 4 0 0 1 0 8Z"></path></svg>
  )
}

// -------------------------------------------
// ※ Home Button
// -------------------------------------------
export function HomeButton() {
  const router = useRouter()
  const pathname = usePathname()
  return <SidebarItem
    label="Home"
    urlpattern="/app{/(premium|message_request)}?"
    icon={<HomeIcon />}
    onClick={() => {
      if (pathname === '/app'
        || pathname.startsWith('/app/message_request')
        || pathname.startsWith('/app/premium')
      ) {
        return
      }
      router.push('/app')
    }}
  />
}
function HomeIcon(props: SVGProps<SVGSVGElement>) {
  // FluentHome12Filled
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" {...props}><path fill="currentColor" d="M5.37 1.222a1 1 0 0 1 1.26 0l3.814 3.09A1.5 1.5 0 0 1 11 5.476V10a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1V7.5A.5.5 0 0 0 7 7H5a.5.5 0 0 0-.5.5V10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.477a1.5 1.5 0 0 1 .556-1.166l3.815-3.089Z"></path></svg>)
}


// -------------------------------------------
// ※ Guild List
// -------------------------------------------

export let addGuildToList: ((guild: Guild) => void)
export let removeGuildFromList: ((id: string) => void)


export function GuildList(
  props: {}
) {
  const router = useRouter()

  const guilds = useGuilds()

  addGuildToList = (guild) => {
    guilds.setData((prev) => [...prev, guild])
  }
  removeGuildFromList = (id) => {
    guilds.setData((prev) => prev.filter(g => g.id !== id))
  }

  return (
    <>
      {
        guilds.data?.map((guild, i) => (
          <SidebarItem
            className={
              cn(
                // "hover:bg-indigo-600 data-[state=active]:bg-indigo-600",
                "bg-indigo-300/10 rounded-2xl hover:rounded-xl transition-all select-none font-medium text-sm w-11 self-center overflow-visible",
                "data-[state=active]:bg-indigo-600 hover:data-[state=active]:bg-indigo-600",
                "opacity-70 data-[state=active]:opacity-100",
                "[&_img]:grayscale [&_img]:data-[state=active]:grayscale-0",
                "data-[state=active]:scale-110"
              )
            }
            onClick={
              () => {
                router.push(`/app/guild/${ guild.id }`)
              }
            }
            urlpattern={`/app/guild/${ guild.id }*`}
            label={guild.name}
            key={i}
            icon={
              !guild.profilePicture
                ? guild.name.split(' ').map(str => str[0]).slice(0, 2).join('')
                : <img src={`https://diskott-avatars.s3.ap-southeast-1.amazonaws.com/guild/${ guild.id }.webp`} alt="" />
            }
          />
        ))
      }
    </>
  )

}

// -------------------------------------------
// ※ Guild Header
// -------------------------------------------

export function OnlyInGuild(
  props: {
    children: ReactNode
  }
) {
  const param = useParams() as { guildid?: string }
  if (!param.guildid) return <></>
  else return props.children
}
export function GuildHeader(
  props: {}
) {
  const param = useParams() as { guildid?: string }
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { data: guilds } = useGuilds()
  if (!param.guildid) return <></>

  const guild = guilds?.find(guild => guild.id === param.guildid)
  if (!guild) {
    // router.push('/app')
    // devtoast("Guild not found when filtering in header")
    return
  }

  return (
    <GuildContextMenu open={open} setOpen={setOpen} guild={guild}>
      <div className={cn(
        "text-sm font-medium px-4 h-11 rounded-t-lg gap-1 shrink-0",
        "border-b-2 border-b-black/10 select-none",

        "flex flex-row items-center justify-between",

        "transition-all",
        "hover:bg-indigo-300/5",
        open && ("bg-indigo-300/5")
      )}>
        <div className="text-nowrap w-0 grow truncate">
          {guild.name} aaaaaaaaaaaaaaaaaaaa
        </div>
        <div className={cn("rotate-0 transition", open && "rotate-90")}>
          {!open && <MajesticonsChevronDown className="text-[1.2rem] transition" />}
          {open && <MajesticonsClose className="text-[1.2rem]" />}
        </div>

      </div>
    </GuildContextMenu>
  )
}

function MajesticonsChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 10l-5 5l-5-5"></path></svg>
  )
}

function MajesticonsClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"></path></svg>
  )
}

function GuildContextMenu(
  props: {
    children: ReactNode
    open: boolean,
    setOpen: (open: boolean) => void
    guild: Guild
  }
) {
  // control the state
  const [open, setOpen] = useState(false)
  const session = useSession()
  const router = useRouter()
  const guilds = useGuilds()

  // const [deleting, setDeleting] = useState(false)

  async function handleDeleteGuildButton() {
    router.push('/app')
    try {
      await runServer(s_deleteGuild, {
        userId: session.getUserId(),
        guildId: props.guild.id
      })
      guilds.removeGuild(props.guild.id)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  // // Delete Guild in the next frame
  // useEffect(() => {
  //   let ignore = false

  //   if (deleting) {
  //     const startDeleting = async () => {
  //       if (!ignore) {
  //         try {
  //           await runServer(s_deleteGuild, {
  //             userId: session.getUserId(),
  //             guildId: props.guild.id
  //           })
  //         } catch (error: any) {
  //           toast.error(error.message)
  //         }
  //         removeGuildFromList(props.guild.id)
  //         setDeleting(false)
  //       }
  //     }
  //     startDeleting()
  //   }

  //   return () => {
  //     ignore = true
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [deleting])

  return (
    <>
      <GuildSettingView guildName={props.guild.name} open={open} onOpenChange={setOpen} />
      <DropdownBase
        open={props.open} onOpenChange={props.setOpen}
        trigger={props.children}>
        {
          session.getUserId() === props.guild.ownerUserId &&
          <>
            <DropdownItem onClick={() => { setOpen(true) }}>
              <FluentSettings28Filled />
              Guild Settings
            </DropdownItem>
            <DropdownItem className="text-red-400 hover:bg-red-500 hover:text-white" onClick={handleDeleteGuildButton}>
              <MaterialSymbolsDeleteRounded />
              Delete Guild (Dev)
            </DropdownItem>
          </>
        }
      </DropdownBase>
    </>
  )
}




export function MaterialSymbolsDeleteRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8q-.425 0-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8q-.425 0-.712.288T13 9v7q0 .425.288.713T14 17"></path></svg>
  )
}