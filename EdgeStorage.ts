import fetch from 'https://deno.land/x/fetch_client@v0.5.0/mod.ts'
import { Bunny } from './Bunny.ts'

function parseRegion(region?: Bunny.StorageRegion) {
  return !region || region === 'Falkenstein' ? '' : region === 'Los Angeles' ? 'la.' : region === 'New York' ? 'ny.' : region === 'Singapore' ? 'sg.' : 'syd.'
}

export function EdgeStorage(f: fetch) {
  return {
    storage: {
      async upload(
        data: {
          zone: string
          key: string
          content: ReadableStream<Uint8Array> | ArrayBuffer | Uint8Array
          sha256?: string
          region?: Bunny.StorageRegion
        },
      ) {
        const { ok } = await f.put(`${parseRegion(data.region)}storage.bunnycdn.com/${data.zone}/${data.key.includes('/') ? data.key : `/${data.key}`}`, {
          data: data.content,
          headers: {
            ...(data.sha256 && { Checksum: data.sha256 })
          },
          type: 'none'
        })

        return ok
      },

      async download(data: { zone: string; key: string, region?: Bunny.StorageRegion }) {
        const { data: stream } = await f.get(
          `${parseRegion(data.region)}storage.bunnycdn.com/${data.zone}/${data.key}`,
          {
            type: 'stream',
          },
        )

        return stream
      },

      async delete(data: { zone: string, key: string, region?: Bunny.StorageRegion }) {
        const { ok } = await f.delete(
          `${parseRegion(data.region)}storage.bunnycdn.com/${data.zone}/${data.key}`,
          {
            type: 'text',
          },
        )

        return ok
      },

      async list(
        data: { zone: string; directory: string, region?: Bunny.StorageRegion },
      ): Promise<Bunny.File[] | undefined> {
        const url = `${parseRegion(data.region)}storage.bunnycdn.com/${data.zone}/${data.directory}/`.replace(
          '///',
          '/',
        )

        const { data: json, ok } = await f.get(
          url,
          {
            type: 'json',
          },
        )

        if (!ok) {
          return
        }

        return json as Bunny.File[]
      },
    },
  }
}
