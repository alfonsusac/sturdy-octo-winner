import { ReactNode } from "react"
import { CloseModalButton, ModalBase } from "./modal"
import { cn } from "@/lib/shared/tailwind"
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import { style } from "@/style"
import { useScreen } from "@/app/app/screen"

/**
 
 ※ Modal Base Component
  extends from [modal] component, has tabs.
  
  onOpen/Close
  - calls screen to trigger settings page transition
  - covers the whole screen
 
 */

export function SettingPage(
  props: {
    trigger: React.ReactNode
    children: React.ReactNode
    firstValue: string
    title?: string
    tabs?: React.ReactNode
    open?: boolean,
    onOpenChange?: (open: boolean) => void
  }
) {
  const baseScreenRef = useScreen()
  return (
    <ModalBase
      open={ props.open }
      onOpenChange={ (open) => {
        baseScreenRef?.current?.setAttribute("data-transition-setting", open ? "true" : "false")
        props.onOpenChange?.(open)
      } }
      trigger={ props.trigger }
      className={ {
        content: cn(
          "bg-transparent flex flex-row justify-center items-stretch",
          // Remove Center Offset
          "top-0 bottom-0 h-full translate-y-0 max-w-none overflow-visible",
          // Transition
          "transition-all duration-200 opacity-0 scale-110",
          "data-[state-transition=true]:opacity-100",
          "data-[state-transition=true]:scale-100",
        ),
        overlay: "bg-[#212432] opacity-0 data-[state-transition=true]:opacity-100",
      } }
    >
      <Tabs.Root
        orientation="vertical"
        defaultValue={ props.firstValue }
        className={ cn("max-w-2xl grow relative text-sm flex flex-row sm:rounded-3xl sm:m-8") }
      >
        <Tabs.List
          className="
              bg-[#212432] w-64 p-2 flex flex-col items-stretch gap-0.5 pt-4
              [&>*]:pl-3"
          aria-label={ props.title }
        >
          <Dialog.Title className={ cn(style.categoryTitle, "font-semibold mb-1 pl-8 text-[0.65rem]") }>{ props.title }</Dialog.Title>
          {/* List of Tabs is passed to here */ }
          { props.tabs }
        </Tabs.List>
        <div className="p-8 bg-[#272B3C] w-full overflow-visible relative before:-z-10 before:top-0 before:left-0 before:absolute before:w-full before:h-full before:bg-[#272B3C] before:origin-[center_left] before:scale-[1000]">
          {/* List of Tab Content is passed to here */ }
          { props.children }
          <CloseModalButton />
        </div>
      </Tabs.Root>
    </ModalBase>
  )
}

// For any component buttons that matches style of tabs.
// - logout button needs to be similar with Tabs.Trigger
export const tabTriggerStyle = cn(
  "px-3 py-2 rounded-[0.25rem] font-medium h-7",
  "flex flex-row items-center justify-between",
  style.buttonListItem,
)
export function TabTrigger(p: { children: React.ReactNode, value?: string }) {
  return <Tabs.Trigger value={ p.value ?? "" } className={ tabTriggerStyle }>{ p.children }</Tabs.Trigger>
}
export function TabContent(p: { children: React.ReactNode, value: string }) {
  return <Tabs.Content value={ p.value }>{ p.children }</Tabs.Content>
}
export function TabContentTitle() {
  
}
export const dividerStyle = cn("h-px m-2 my-2 border-indigo-300/10")
