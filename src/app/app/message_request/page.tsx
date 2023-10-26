import { FluentChat28Filled } from "../@sidebar/default"
import { TitleBar } from "../_comps/titlebar"

export default function MessageRequestPage() {
  return (
    <>
      <TitleBar
        icon={ <FluentChat28Filled /> }
        title="Message Request"
      />
    </>
  )
}