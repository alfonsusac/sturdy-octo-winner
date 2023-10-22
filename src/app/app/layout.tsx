import { getSession } from "@/lib/next-auth"
import { BaseLayout, Providers } from "./layout.client"

export default async function AppLayout(p: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <Providers session={ session }>
      <BaseLayout>
        {p.children}
      </BaseLayout>
    </Providers>
  )
}