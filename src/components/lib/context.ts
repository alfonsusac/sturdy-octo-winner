import { createContext, useContext } from "react";

export function createReactContext<T>(defaultValue: T) {
  const provider = createContext(defaultValue)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hook = () => useContext(provider)
  return [provider, hook] as const
}