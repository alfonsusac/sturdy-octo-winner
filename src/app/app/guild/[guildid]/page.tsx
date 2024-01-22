import { SVGProps } from "react"
import { TitleBar } from "../../titlebar"

export default function GuildPage(
  context: {
    params: {
      guildid: string
    }
  }
) {
  

  return (
    <>
      <TitleBar icon={ <AkarIconsHashtag /> } title="Guild" menus={ <></> } />
      Guildid
      
      <div>
        { context.params.guildid }
      </div>
    </>
  )
}



export function AkarIconsHashtag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3L6 21M18 3l-4 18M4 8h17M3 16h17"></path></svg>
  )
}