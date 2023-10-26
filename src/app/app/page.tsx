import { cn } from "@/lib/tailwind"
import { FluentPeople28Filled } from "./@sidebar/default"
import { TitleBar } from "./_comps/titlebar"
import { style } from "@/style"

export default function AppPage() {
  return (
    <>
      <TitleBar
        icon={ <FluentPeople28Filled /> }
        title="Friends"
        menus={<></>}
      />
      <div className="px-4 pt-4 flex flex-col min-h-0">
        <input
          className={ cn(
            "bg-black/30 rounded-md p-1.5 px-2.5 max-w-none min-w-none",
            "block",
            "placeholder:text-indigo-200/30",
            "w-full",
            "mb-4",
          ) }
          placeholder="Search"
        />
        <div className={ cn(
          "my-2",
          style.categoryTitle,
          "uppercase",
        ) }>
          online - { 50 }
        </div>
        <div className="flex flex-col items-stretch min-w-0 overflow-y-scroll">
          {
            [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0].map((e, i) => (
              <div key={ i } className={ cn(
                "p-2 w-auto",
                "flex flex-row",
                "gap-2",
                "rounded-md",
                "hover:bg-indigo-300/10"
              ) }>
                <div className="w-9 h-9 rounded-full bg-black/30"/>
                <div className="flex flex-col items-start">
                  <div className="">
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