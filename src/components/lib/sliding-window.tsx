import { ComponentProps, ReactNode, useCallback, useEffect, useId, useRef, useState } from "react"
import { createReactContext } from "./context"
import { cn } from "@/lib/tailwind"

// ※ Sliding Window API
//  trigger dynamic adaptive height transition when switching pages from left/right
// 
//  how tf does it work:
//  - the [use sliding window container] hook returns function to navigate backward and from (goTo, goBack, reset)
//  - when those function is invoked, set necessary states to create the "sliding" effects
//  - the [use sliding window container] also returns a ref [parentContainerRef] that 
//     needs to be passed to parent container to set their height based on child pages.
//  - the [parentContainerRef] has a callback that triggers when the node is mounted.
//  - Parent Container is rendered first before the child compoenenbt
//  - therefore, a setter is passed down using [setParentHeightRef]
//  - on parent node mounted, get div size and set as height in styles.
//  - on parent node mounted, set the [setParentHeightRef] to modify the parent node's height style.
//  - on child node mounted, set the parent height using [setParentHeightRef] to whatever this child's height is.
//
// anatomy
/** 
```tsx
const {
  useSlidingWindowContainer,
  SlidingWindowProvider,
  SlidingPage,
} = createSlidingWindow(<duration>, ...<states>)

export const Page(){
  const { goTo, goBack, resetState, parentContainerRef, states } = useSlidingWindowContainer()

  return (
    <div ref={parentContainerRef}>
    
    </div>
  )


}
```
*/
export function createSlidingWindow<S extends Readonly<string[]>>(duration: number, ...states: S) {
  type T = S[number]
  function useSlidingWindowContainer() {
    const [state, setState] = useState<T>(states[0] as T)
    const [leftSide, setLeftSide] = useState<T>()
    const [rightSide, setRightSide] = useState<T>()
    const [animationState, setAnimationState] = useState<"left" | "right" | undefined>(undefined)
    let setParentHeightRef = useRef<(height: number) => void>()

    const parentContainerRef = useCallback((node: HTMLDivElement) => {
      if (node === null) return
      // On parent container mount, 

      // set current height as style heigh (if its empty)
      if (node.style.height === "") node.style.height = node.clientHeight + "px"

      // set the parent setter to a ref variable (to be distributed to child context and used in child)
      setParentHeightRef.current = (height) => node.style.height = `${height}px`
    }, [])

    const goTo = (dest: T) => {
      setState(dest)
      setLeftSide(state) // curr to left
      setRightSide(dest) // new from right
      setAnimationState("right")
    }

    const goBack = (dest: T) => {
      setState(dest)
      setLeftSide(dest) // new form left
      setRightSide(state) // curr to right
      setAnimationState("left")
    }

    useEffect(() => {
      if (animationState !== undefined) {
        setTimeout(() => {
          setAnimationState(undefined)
          setLeftSide(undefined)
          setRightSide(undefined)
        }, duration)
      }
    }, [animationState])

    const resetState = () => {
      setState(states[0] as T)
    }

    return {
      states: { state, leftSide, rightSide, animationState, setParentHeightRef},
      goTo, goBack, resetState, parentContainerRef,
    }
  }

  // Setting Context to avoid prop drilling
  type contextType = ReturnType<typeof useSlidingWindowContainer>['states']

  const [ slidingWindowContainer, useSlidingWindowContext] = createReactContext<contextType | undefined>(undefined)

  function SlidingWindowProvider({ children, states }: { children: ReactNode, states: contextType }) {
    return <slidingWindowContainer.Provider value={ states }>
      <div className={ cn(
        "relative w-full items-center transition-none", // transition-none important
        states.animationState && cn(
          "transition-transform duration-500 w-[200%] grid grid-cols-2 pointer-events-none",
          states.animationState === "right" && "-translate-x-1/2", // Start from left most to mid
          states.animationState === "left" && "-left-full translate-x-1/2", // Start from mid (not left most) to left most
        ),
      ) }>
        { children }
      </div>
    </slidingWindowContainer.Provider>
  }

  // Child Component
  function SlidingPage({ state, className, ...props }: ComponentProps<"div"> & { state: T }) {

    const { state: currentWindowState, leftSide, rightSide, setParentHeightRef } = useSlidingWindowContext()!
    const show = currentWindowState === state
    enum pos { left = "left", right = "right" }
    const position = leftSide === state ? pos.left : rightSide === state ? pos.right : undefined
    const pageId = useId()

    // Transition Logic
    // This section delays when finished is turned to true
    const [hidden, setHidden] = useState(!show)
    //                                    ^ if its already showing, 
    //                                      dont hide.
    useEffect(() => {
      // If received instruction to hide but currently showing, then delay the hiding 
      if (!show && !hidden)
        setTimeout(() => {
          setHidden(true) // Hide it after animationDuration
        }, duration)

      // If received instruciton to show, then immediately un-hide it.
      if (show) setHidden(false)
    }, [show, hidden])

    // Used to change the width of the parent when this component is mounted.
    const ref = useCallback((node: HTMLDivElement) => {
      if (node !== null) {
        // When child page is mounted,
        // - set the parent container to the size of the child.
        setParentHeightRef.current?.(node.clientHeight)
      }
    }, [setParentHeightRef])

    return (
      !hidden && <div id={ pageId } data-state-id={ state } ref={ ref }
        className={ cn(className, "transition-all duration-500",
          // Swaps the grid placement to be the correct order
          position === pos.left && "col-start-1 col-end-1 row-start-1 row-end-1",
          position === pos.right && "col-start-2 col-end-2 row-start-1 row-end-1",
        ) } { ...props } />
    )
  }

  return { useSlidingWindowContainer, SlidingWindowProvider, SlidingPage }
}