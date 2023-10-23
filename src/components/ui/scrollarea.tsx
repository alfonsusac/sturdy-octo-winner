import * as RadixScrollArea from '@radix-ui/react-scroll-area'

export default function ScrollArea() {
  return (
    <RadixScrollArea.Root>
      <RadixScrollArea.Viewport />
      <RadixScrollArea.Scrollbar orientation="horizontal">
        <RadixScrollArea.Thumb />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Scrollbar orientation="vertical">
        <RadixScrollArea.Thumb />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  )
}