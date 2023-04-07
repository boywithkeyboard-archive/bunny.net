// deno-lint-ignore no-namespace
export namespace Bunny {
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

  export type StorageRegion =
    | 'Falkenstein'
    | 'New York'
    | 'Los Angeles'
    | 'Singapore'
    | 'Sydney'
}
