import { SVGProps } from "react"
import { TitleBar } from "../../titlebar"
import prisma from "@/lib/db/prisma"
import { HydrateState } from "@/components/api/create-query"
import { GuildName } from "./client"

export default function GuildPage(
  context: {
    params: {
      guildid: string
    }
  }
) {

  return (
    <HydrateState>
      <TitleBar icon={<AkarIconsHashtag />} title="Guild" menus={<></>} />
      <div className="w-full max-w-screen-sm mx-auto p-8
        flexlist gap-4
      ">
        <h2 className="text-3xl font-bold opacity-60">
          <GuildName guildid={context.params.guildid} />
        </h2>
        <pre className="p-3 rounded-lg bg-black/10 overflow-auto">
          {context.params.guildid}
        </pre>
        <div className="p-3 rounded-lg bg-black/10">
          <h3 className="text-base font-medium text-indigo-300/20 mb-2">Server Invites</h3>
          <div className="min-h-8">
            <ServerInvites guildId={context.params.guildid} />
          </div>
        </div>
      </div>
    </HydrateState>
  )
}



export function AkarIconsHashtag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3L6 21M18 3l-4 18M4 8h17M3 16h17"></path></svg>
  )
}

async function ServerInvites(
  props: {
    guildId: string
  }
) {
  const invites = await prisma.guildInvite.findMany({ where: { guildId: props.guildId } })

  return (
    <>
      {
        invites.map(i => (
          <div key={i.id} className="p-2 hover:bg-indigo-200/5 rounded-md">
            {i.inviteKey}
          </div>
        ))
      }
    </>
  )
}
