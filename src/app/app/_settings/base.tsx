import { cn } from '@/lib/tailwind'
import { style } from '@/style'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'
import { useScreen } from '../layout.client'
import { CloseModalButton } from '../_modal/buttons'
import BaseModal from '../_modal/base'

export default function BaseSettingView(p: {
  trigger: React.ReactNode
  children: React.ReactNode
  firstValue: string
  title?: string
  tabs?: React.ReactNode
}) {
  const screenRef = useScreen()

  return (
    <BaseModal
      onOpenTransitionStart={ () => {
        screenRef?.current?.setAttribute("data-transition-setting", "true")
      } }
      onCloseTransitionStart={ () => {
        screenRef?.current?.setAttribute("data-transition-setting", "false")
      }}
      trigger={p.trigger}
      className={ {
        content: cn(
          "bg-indigo-300/20",
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
          "data-[state-transition=false]:opacity-0",
          "data-[state-transition=true]:opacity-100",

          "scale-110",
          "data-[state-transition=true]:scale-100",

        ),
        overlay: cn(
          "opacity-0",
          "data-[state-transition=false]:opacity-0",
          "data-[state-transition=true]:opacity-100"
        ),
      }}
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
        ) }
          aria-label={ p.title }
        >
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
    </BaseModal>
  )


  // return (
  //   <Dialog.Root open={ open } onOpenChange={ handleOpenChange }>
  //     <Dialog.Trigger asChild>
  //       { p.trigger }
  //     </Dialog.Trigger>
  //     <Dialog.Portal>
  //       <Dialog.Overlay
  //         className={ cn(
  //           "fixed inset-0",
  //           "bg-black",

  //           "transition-all duration-300",
  //           "opacity-0",
  //           "data-[state-transition=false]:opacity-0",
  //           "data-[state-transition=true]:opacity-100"
  //         )}
  //         data-state-transition={ transition }
  //       />

  //       <Dialog.Content
  //         className={ cn(
  //           "bg-indigo-300/20",
  //           "flex flex-row justify-center items-stretch",
            
  //           "inset-0",
  //           "sm:p-8",

  //           "transition-all duration-300",
  //           "opacity-0",
  //           "data-[state-transition=false]:opacity-0",
  //           "data-[state-transition=true]:opacity-100",
            
  //           "scale-110",
  //           "data-[state-transition=true]:scale-100"
  //         ) }

  //         data-state-transition={ transition }
  //       >
  //         <Tabs.Root
  //           orientation="vertical"
  //           defaultValue={ p.firstValue }
  //           className={ cn(
  //             "max-w-2xl",
  //             "bg-indigo-300/10",
  //             "grow",
  //             "relative",

  //             "overflow-clip",
  //             "flex flex-row",
  //             "sm:rounded-3xl",

  //             "text-sm",
  //           ) }
  //         >
  //           <Tabs.List className={ cn(
  //             "bg-black/10",
  //             "w-20",
  //             "sm:w-44",
  //             "p-2",
  //             "flex flex-col items-stretch gap-0.5",
  //           ) }
  //             aria-label={ p.title }
  //           >
  //             <Dialog.Title className={ cn(
  //               style.categoryTitle,
  //               "mt-4 mb-1",
  //               "ml-3",
  //               "font-semibold",
  //             ) }>
  //               { p.title }
  //             </Dialog.Title>

  //             {p.tabs}

  //           </Tabs.List>
  //           <div className="p-8">
  //             { p.children }
  //             <CloseModalButton />
  //           </div>
  //         </Tabs.Root>

  //       </Dialog.Content>

  //     </Dialog.Portal>
  //   </Dialog.Root>
  // )
}

export const settingTabTriggerStyle = cn(
  "px-3 py-1.5",
  "rounded-md",
  "font-medium",
  style.buttonListItem,
  "flex flex-row items-center justify-between",
)
export function SettingTabTrigger(p: {
  children: React.ReactNode
  value: string
  disabled?: boolean
}) {
  return (
    <Tabs.Trigger value={ p.value }
      className={ settingTabTriggerStyle }
    >
      { p.children }
    </Tabs.Trigger>
  )
}



export function SettingsTabContent(p: {
  children: React.ReactNode
  value: string
}) {
  return (
    <Tabs.Content value={ p.value }></Tabs.Content>
  )
}
