import { FluentPremium12Filled } from "../@sidebar/default"
import { TitleBar } from "../_comps/titlebar"

export default function PremiumPage() {
  return (
    <>
      <TitleBar
        icon={ <FluentPremium12Filled /> }
        title="Premium"
      />
    </>
  )
}