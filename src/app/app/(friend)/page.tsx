import { cn } from "@/lib/tailwind"
import { FluentPeople28Filled } from "../@innersidebar/default"
import { TitleBar } from "../titlebar"
import { style } from "@/style"
import { AppPageClient } from "./client"

export default function AppPage() {
  return (
    <AppPageClient>
      <div className="px-4 pt-4 flex flex-col min-h-0">
        <input
          className="bg-black/30 rounded-md p-1.5 px-2.5 mb-4 max-w-none min-w-none block w-full"
          placeholder="Search"
        />
        <div className={ cn(
          "my-2",
          style.categoryTitle,
          "uppercase",
        ) }>
          online - { 50 }
        </div>
        <div className="flex flex-col items-stretch overflow-y-scroll">
          {
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
              <div key={ i } className={ cn(
                "p-2 w-auto",
                "flex flex-row shrink-0",
                "gap-2",
                "rounded-md",
                "hover:bg-indigo-300/10"
              ) }>
                <div className="w-9 h-9 rounded-full bg-black/30" />
                <div className="flex flex-col items-start">
                  <div>
                    Friend A
                  </div>
                  <div className="text-xs leading-none text-indigo-100/40">
                    Status
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </AppPageClient>
  )

  return (
    <>
      <TitleBar icon={ <FluentPeople28Filled /> } title="Friends" menus={ <>Test</> } />
      <div className="px-4 pt-4 flex flex-col min-h-0">
        <input
          className="bg-black/30 rounded-md p-1.5 px-2.5 mb-4 max-w-none min-w-none block w-full"
          placeholder="Search"
        />
        <div className={ cn(
          "my-2",
          style.categoryTitle,
          "uppercase",
        ) }>
          online - { 50 }
        </div>
        <div className="flex flex-col items-stretch overflow-y-scroll">
          {
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => (
              <div key={ i } className={ cn(
                "p-2 w-auto",
                "flex flex-row shrink-0",
                "gap-2",
                "rounded-md",
                "hover:bg-indigo-300/10"
              ) }>
                <div className="w-9 h-9 rounded-full bg-black/30" />
                <div className="flex flex-col items-start">
                  <div>
                    Friend A
                  </div>
                  <div className="text-xs leading-none text-indigo-100/40">
                    Status
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export function AllFriendListServer() {
  return (
    <>
    </>
  )
}