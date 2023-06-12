import fetch from 'https://deno.land/x/fetch_client@v0.7.0/mod.ts'

export interface File {
  Guid: string
  StorageZoneName: string
  Path: string
  ObjectName: string
  Length: number
  LastChanged: string
  IsDirectory: boolean
  ServerId: number
  UserId: string
  DateCreated: string
  StorageZoneId: number
  Checksum: string
  ReplicatedZones: string
}

export type Region =
  | 'Falkenstein'
  | 'New York'
  | 'Los Angeles'
  | 'Singapore'
  | 'Sydney'

function parseRegion(region?: Region) {
  return !region || region === 'Falkenstein' ? '' : region === 'Los Angeles' ? 'la.' : region === 'New York' ? 'ny.' : region === 'Singapore' ? 'sg.' : 'syd.'
}

type Data = {
  storage: {
    upload(data: {
      zone: string
      key: string
      content: ReadableStream<Uint8Array> | ArrayBuffer | Uint8Array
      sha256?: string
      region?: Region
    }): Promise<boolean>

    download(data: {
        zone: string
        key: string
        region?: Region
    }): Promise<ReadableStream<Uint8Array> | undefined>

    delete(data: {
      zone: string;
      key: string;
      region?: Region
    }): Promise<boolean>

    list(data: {
      zone: string
      directory: string
      region?: Region
    }): Promise<File[] | undefined>
  }
}

export function EdgeStorage(options: { token?: string, region?: Region, zone?: string }): ((options: fetch) => Data)
export function EdgeStorage(options: fetch): Data
export function EdgeStorage(options: fetch | { token?: string, region?: Region, zone?: string }) {
  const storage = (f: fetch, o: { token?: string, region?: Region, zone?: string }) => {
    return {
      async upload(
        data: {
          zone?: string
          key: string
          content: ReadableStream<Uint8Array> | ArrayBuffer | Uint8Array
          sha256?: string
          region?: Region
        },
      ) {
        if (!o.zone && !data.zone)
          throw new Error('No storage zone defined!')

        const { ok } = await f.put(`${parseRegion(data.region ?? o.region)}storage.bunnycdn.com/${data.zone ?? o.zone}/${data.key.includes('/') ? data.key : `/${data.key}`}`, {
          data: data.content,
          headers: {
            ...(data.sha256 && { Checksum: data.sha256 }),
            ...(o.token && { AccessKey: o.token })
          },
          type: 'none'
        })
  
        return ok
      },
  
      async download(data: { zone: string; key: string, region?: Region }) {
        if (!o.zone && !data.zone)
          throw new Error('No storage zone defined!')

        const { data: stream } = await f.get(
          `${parseRegion(data.region ?? o.region)}storage.bunnycdn.com/${data.zone ?? o.zone}/${data.key}`,
          {
            type: 'stream',
            headers: {
              ...(o.token && { AccessKey: o.token })
            }
          },
        )
  
        return stream
      },
  
      async delete(data: { zone: string, key: string, region?: Region }) {
        if (!o.zone && !data.zone)
          throw new Error('No storage zone defined!')

        const { ok } = await f.delete(
          `${parseRegion(data.region ?? o.region)}storage.bunnycdn.com/${data.zone ?? o.zone}/${data.key}`,
          {
            type: 'text',
            headers: {
              ...(o.token && { AccessKey: o.token })
            }
          },
        )
  
        return ok
      },
  
      async list(data: { zone: string, directory: string, region?: Region }): Promise<File[] | undefined> {
        if (!o.zone && !data.zone)
          throw new Error('No storage zone defined!')

        const url = `${parseRegion(data.region ?? o.region)}storage.bunnycdn.com/${data.zone ?? o.zone}/${data.directory}/`
          .replace('///', '/')
  
        const { data: json, ok } = await f.get(url, {
          type: 'json',
          headers: {
            ...(o.token && { AccessKey: o.token })
          }
        })
  
        if (!ok)
          return
  
        return json as File[]
      }
    }
  }

  // @ts-ignore: type issue only
  if (!options.get)
    // @ts-ignore: type issue only
    return (f: fetch) => ({ storage: storage(f, options) })
  else
    return { storage: storage(options as fetch, {}) }
}
