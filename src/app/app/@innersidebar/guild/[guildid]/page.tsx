import { getUserGuildList } from "@/controller/user"

export default async function GuildSidebar() {
  const guildList = await getUserGuildList()
  return <div>
    <div>
      
    </div>
  </div>
}

