import { useSession } from "next-auth/react"
import { ReactNode } from "react"
import { SettingPage, TabContent, TabTrigger } from "../base/settings"

export default function GuildSettingView(
  props: {
    children?: ReactNode
    guildName: string
    open: boolean,
    onOpenChange: (open: boolean) => void
  }
) {
  const session = useSession()
  return (
    <SettingPage
      trigger={ props.children ?? undefined }
      title={ props.guildName }
      firstValue="Overview"
      tabs={
        <>
          <TabTrigger value="Overview">Overview</TabTrigger>
        </>
      }
      open={ props.open }
      onOpenChange={ props.onOpenChange }
    >
      <TabContent value="Overview">
        <div>

        </div>
      </TabContent>
    </SettingPage>
  )
}