import { SessionProviderClientComp, UpdateSession } from "./client"

export default async function Page() {

  return (
    <SessionProviderClientComp>
      <UpdateSession />
    </SessionProviderClientComp>
  )

  // const session = await getServerSession(authOption)

  // return (
  //   <ClientProviders session={session}>
  //     <pre>{JSON.stringify(session, null, 1)}</pre>
  //     <UpdateSession />
  //   </ClientProviders>
  // )
}