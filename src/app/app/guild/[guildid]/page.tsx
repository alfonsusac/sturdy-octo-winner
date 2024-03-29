import { SVGProps } from "react"
import { TitleBar } from "../../titlebar"
import { prisma } from "@/lib/server/prisma"
import { HydrateState } from "@/components/api/create-query"
import { GuildName, ServerMemberItem } from "./client"

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
        <h2 className="text-3xl font-bold opacity-90">
          <GuildName guildid={context.params.guildid} />
        </h2>
        <p className="opacity-20 font-mono">
          {context.params.guildid}
        </p>
        <div className="p-3 rounded-lg bg-black/10 min-h-20">
          <h3 className="mb-2 font-medium">Server Invites</h3>
          <GuildInvites guildId={context.params.guildid} />
        </div>
        <div className="p-3 rounded-lg bg-black/10 min-h-20 space-y-2">
          <h3>Server Members</h3>
          <GuildMembers guildId={context.params.guildid} />
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

async function GuildInvites(
  props: { guildId: string }
) {
  const invites = await prisma.guildInvite.findMany({ where: { guildId: props.guildId } })

  if (invites.length === 0) {
    return (
      <div className="text-center opacity-60 text-sm flex-none p-4">
        No Server Invite
      </div>
    )
  }


  return invites.map(i => (
    <div key={i.id} className="p-2 hover:bg-indigo-200/5 rounded-md">
      {i.inviteKey}
    </div>
  ))
}

async function GuildMembers(
  props: { guildId: string }
) {
  const members = await prisma.guildMember.findMany({ where: { guildId: props.guildId } })
  return members.map(member => (
    <div key={member.userId} className="p-1 hover:bg-indigo-200/5 rounded-md">
      <ServerMemberItem userid={member.userId} />
    </div>
  ))
}