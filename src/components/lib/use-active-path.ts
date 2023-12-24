import { usePathname } from "next/navigation"

// ※ useActivePath (client component hook)
//  hook to decide whether to highlight current component or not
//
//  usage: `const selected = useActivePath("/home*")`
//  will return true if current path is:
//  /home
//  /home/friends
//  /home/5
//
//  good for navbar items

export function useActivePath(pattern: string) {
  const path = usePathname()
  // dummy link coz urlpattern cant work without base url
  const urlpattern = new URLPattern(pattern, "https://www.a.com")
  return urlpattern.test(path, "https://www.a.com")
}


