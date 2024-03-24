export type BasicResponse<Data> =
  | {
    data: Data
    error: false
  }
  | {
    data: null
    error: true
    statusCode: number
  }
