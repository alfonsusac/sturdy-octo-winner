import { cn } from "@/lib/tailwind"
import { HomeSidebarMenuItem } from "./client"
import { SVGProps } from "react"
import { style } from "@/style"

export default function HomeSidebar(p: any) {
  return (
    <>
      <div className={ cn(
        "m-2 p-1.5 bg-black/30 text-xs text-indigo-100/40 rounded-md",
        "flex justify-center items-center",
      ) }>
        Find or start a conversation
      </div>

      <div className="p-2 overflow-y-scroll h-0 grow">
        <div className="flex flex-col gap-0.5 ">
          <HomeSidebarMenuItem
            icon={ <FluentPeople28Filled /> }
            label={ <>Friends</> }
            pattern="/app"
            link="/app"
          />
          <HomeSidebarMenuItem
            icon={ <FluentPremium12Filled /> }
            label={ <>Premium</> }
            pattern="/app/premium"
            link="/app/premium"
          />
          <HomeSidebarMenuItem
            icon={ <FluentChat28Filled /> }
            label={ <>Message Requests</> }
            pattern="/app/message_request"
            link="/app/message_request"
          />
        </div>

        <div className="mt-6">
          <div className={ cn(
            "flex flex-row justify-between items-center ",
            "pl-2",
            "my-2",
            style.categoryTitle,
          ) }>
            <div>
              Direct Messages
            </div>
            <div>
              <FluentAdd12Filled className="text-[1.3em] text-indigo-200/40" />
            </div>
          </div>
          {
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((e, i) => (
              <button key={ i } className={ cn(
                "px-1 py-1.5",
                "rounded-md",
                "flex flex-row gap-2 items-center",
                "min-h-0",
                "w-full",
                "text-sm",
                style.buttonListItem,

              ) }>
                <div className="w-7 h-7 bg-black/30 rounded-full">

                </div>
                <div className="h-[1.1lh]">
                  Lorem Ipsum
                </div>
              </button>
            ))
          }
        </div>
      </div>
    </>
  )
}

export function FluentPeople28Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28" { ...props }><path fill="currentColor" d="M9.5 14a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9Zm7.6 7.619c.763.235 1.714.381 2.9.381c6 0 6-3.75 6-3.75A2.25 2.25 0 0 0 23.75 16h-6.656a3.24 3.24 0 0 1 .904 2.25v.555l-.003.083a5.52 5.52 0 0 1-.154.99a6.082 6.082 0 0 1-.74 1.74ZM23.5 10.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0ZM2 18.25A2.25 2.25 0 0 1 4.25 16h10.5A2.25 2.25 0 0 1 17 18.25v.5S17 24 9.5 24S2 18.75 2 18.75v-.5Z"></path></svg>
  )
}
export function FluentChat28Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28" { ...props }><path fill="currentColor" d="M2 14C2 7.373 7.373 2 14 2s12 5.373 12 12s-5.373 12-12 12a11.95 11.95 0 0 1-5.637-1.404l-4.77 1.357a1.25 1.25 0 0 1-1.544-1.544l1.356-4.77A11.95 11.95 0 0 1 2 14Zm7.5-2.25c0 .414.336.75.75.75h7.5a.75.75 0 0 0 0-1.5h-7.5a.75.75 0 0 0-.75.75Zm.75 3.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"></path></svg>
  )
}
export function FluentPremium12Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" { ...props }><path fill="currentColor" d="M3 1h1.046L2.997 4H1.191l1.362-2.724A.5.5 0 0 1 3 1ZM1.227 5l3.014 4.687L2.97 5H1.227Zm2.779 0l1.53 5.645a.48.48 0 0 0 .928 0L7.998 5H4.006Zm5.028 0L7.76 9.685L10.773 5h-1.74Zm1.775-1H9.006l-1.05-3H9a.5.5 0 0 1 .448.276L10.809 4ZM7.947 4h-3.89l1.048-3h1.79l1.052 3Z"></path></svg>
  )
}



export function FluentAdd12Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" { ...props }><path fill="currentColor" d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75Z"></path></svg>
  )
}