import { cn } from '@/lib/tailwind'
import { style } from '@/style'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import { useScreen } from '@/app/app/layout.client'
import { CloseModalButton } from '@/app/app/_modal/buttons'
import { ModalBase } from '../base/modal'

export namespace SettingsMenu {
  export function Base(p: {
    trigger: React.ReactNode
    children: React.ReactNode
    firstValue: string
    title?: string
    tabs?: React.ReactNode
  }) {
    const screenRef = useScreen()

    return (
      <ModalBase
        onOpen={ () => { screenRef?.current?.setAttribute("data-transition-setting", "true") } }
        onClose={ () => { screenRef?.current?.setAttribute("data-transition-setting", "false") } }
        trigger={ p.trigger }
        className={ {
          content: cn(
            // "bg-indigo-300/20",
            "flex flex-row justify-center items-stretch",
            "sm:p-8",
            // Remove Center Offset
            "translate-x-0 translate-y-0",
            "inset-0",
            "max-w-none",
            "rounded-none",
            // Transition
            "transition-all duration-300",
            "opacity-0",
            "data-[state-transition=true]:opacity-100",
            "scale-110",
            "data-[state-transition=true]:scale-100",
          ),
          overlay: cn(
            "opacity-0",
            "data-[state-transition=true]:opacity-100",
          ),
        } }
      >
        <Tabs.Root
          orientation="vertical"
          defaultValue={ p.firstValue }
          className={ cn(
            "max-w-2xl",
            "bg-indigo-300/10",
            "grow",
            "relative",

            "overflow-clip",
            "flex flex-row",
            "sm:rounded-3xl",

            "text-sm",
          ) }
        >
          <Tabs.List className={ cn(
            "bg-black/10",
            "w-20",
            "sm:w-44",
            "p-2",
            "flex flex-col items-stretch gap-0.5",
          ) } aria-label={ p.title }>
            <Dialog.Title className={ cn(
              style.categoryTitle,
              "mt-4 mb-1",
              "ml-3",
              "font-semibold",
            ) }>
              { p.title }
            </Dialog.Title>
            { p.tabs }
          </Tabs.List>

          <div className="p-8">
            { p.children }
            <CloseModalButton />
          </div>

        </Tabs.Root>
      </ModalBase>
    )
  }

  export const tabTriggerStyle = cn(
    "px-3 py-1.5",
    "rounded-md",
    "font-medium",
    style.buttonListItem,
    "flex flex-row items-center justify-between",
  )
  export function TabTrigger(p: {
    children: React.ReactNode
    value: string
    disabled?: boolean
  }) {
    return <Tabs.Trigger value={ p.value } className={ tabTriggerStyle }>
      { p.children }
    </Tabs.Trigger>

  }
  export function TabContent(p: {
    children: React.ReactNode
    value: string
  }) {
    return <Tabs.Content value={ p.value }></Tabs.Content>
  }

}

