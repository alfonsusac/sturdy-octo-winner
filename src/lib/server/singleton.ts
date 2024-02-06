
// Creates Singleton so that no instance is created when hot-reloaded.
export function createSingleton<Instance>(name: string, instantiate: () => Instance) {
  const globalAny = globalThis as any

  const singleton = (globalAny[name] as Instance) ?? instantiate() 

  if (process.env.NODE_ENV !== 'production')
    globalAny[name] = singleton

  return singleton
}