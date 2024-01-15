type SuccessResponse<T extends any> = {
  data: T
}
type ErrorResponse = {
  error: any
}
export type ServerAction<T> = SuccessResponse<T> | ErrorResponse

