/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext } from "react";

export function createReactContext<T>(defaultValue: T) {
  const context = createContext(defaultValue)
  const hook = () => useContext(context)
  return [context.Provider, hook] as const
}