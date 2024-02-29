import { DNS } from './dns'

export class Client {
  #token: string
  #debug: boolean

  constructor(options: {
    token: string
    debug?: boolean
  }) {
    this.#token = options.token
    this.#debug = options.debug === true
  }

  get dns() {
    return new DNS({
      token: this.#token,
      debug: this.#debug
    })
  }
}
