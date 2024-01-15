export default function GuildPage(
  context: {
    params: {
      guildid: string
    }
  }
) {
  

  return (
    <div>
      Guildid
      <div>
        { context.params.guildid }
      </div>
    </div>
  )
}