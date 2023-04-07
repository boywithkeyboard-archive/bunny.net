import fetch from 'https://deno.land/x/fetch_client@v0.5.0/mod.ts'

export class Client {
  private fetch

  constructor(options: { token: string }) {
    this.fetch = new fetch({
      base: 'https://',
      headers: { AccessKey: options.token }
    })
  }

  use<T extends ((fetch: fetch) => Record<string, unknown>)>(plugin: T) {
    return Object.assign(this, plugin(this.fetch)) as (typeof this) & ReturnType<T>
  }
}
