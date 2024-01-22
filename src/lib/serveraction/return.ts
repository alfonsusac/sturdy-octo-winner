
// export function handleServerActionReturn<T extends any>(res: {
//   error: string
//   data?: undefined
// } | {
//   data: T
//   error?: undefined
// }) {
//   if ('error' in res) throw res.error
//   else return res.data
// }

export async function runServerAction<
  P extends any,
  R extends object | undefined,
>(
  action: (...params: P[]) => Promise<R>,
  ...params: P[]
): Promise<
  // first checks if there is data returned at some point of function
  //  and this line eliminates the possibility of it not returning data
  //  since if "the action that may returns data" returns not data,
  //  it will throw error -> therefore never
  R extends { data?: undefined } ? never :
  // the second one checks the data type of 'data' prop.
  //  this also covers the possibiltiy that 'data' prop is not fonud,
  //  therefore returning undefined
  R extends { data: infer S } ? S : undefined
> {
  const res = await action(...params)

  if (!res) return undefined as any

  if ('error' in res) {
    console.log("Error is in res")
    if (typeof res.error === 'string') {
      console.log(res.error)
      throw new Error(res.error)
    }
    else {
      console.log(res.error)
      throw new Error("Unknown server ocurred")
    }
  }
  if ('data' in res)
    return res.data as any

  return undefined as any
}