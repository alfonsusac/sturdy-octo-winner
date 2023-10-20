export function env(name: string) {
  const val = process.env[name]
  if (!val) throw new Error(`${name} Env Var not found!`)
  return val
}