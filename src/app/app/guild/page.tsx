import redirect from "@/lib/navigation"

export default function Page() {
  redirect('/app')

  return (
    <>
      You shouldnt see this, u need guildid. Dev, pls redirect to guildid
    </>
  )
}