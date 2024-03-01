import { BasicResponse } from '../shared'
import { DNSRecord } from './DNSRecord'
import { DNSRecordType, RECORD_TYPES } from './DNSRecordType'
import { DNSZone } from './DNSZone'
import { LOG_ANONYMIZATION_TYPE } from './LogAnonymizationType'
import { MONITOR_TYPES, MonitorType } from './MonitorType'
import { SMART_ROUTING_TYPES, SmartRoutingType } from './SmartRoutingType'
import { parseRecordFromJson } from './parseRecordFromJson'

export type AddRecordOptions = {
  type: DNSRecordType
  ttl?: number
  name: string
  value: string
  weight?: number
  priority?: number
  flags?: number
  tag?: string
  port?: number
  pullZoneId?: number
  scriptId?: number
  accelerated?: boolean
  monitorType?: MonitorType
  geolocationLatitude?: number
  geolocationLongitude?: number
  latencyZone?: string
  smartRoutingType?: SmartRoutingType
  disabled?: boolean
  environmentVariables?: Array<{
    name: string
    value: string
  }>
  comment?: string
}

export type UpdateRecordOptions = Partial<AddRecordOptions>

export class DNS {
  #token: string
  #debug: boolean

  constructor(options: {
    token: string
    debug: boolean
  }) {
    this.#token = options.token
    this.#debug = options.debug
  }

  addZone = async (options: {
    domain: string
  }): Promise<BasicResponse<null>> => {
    const res = await fetch('https://api.bunny.net/dnszone', {
      method: 'POST',
      headers: {
        AccessKey: this.#token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Domain: options.domain
      })
    })

    if (!res.ok) {
      if (this.#debug) {
        const str = await res.text()

        console.error(str)
      }

      return {
        data: null,
        error: true,
        statusCode: res.status
      }
    }

    return {
      data: null,
      error: false
    }
  }

  getZone = async (id: number): Promise<BasicResponse<DNSZone>> => {
    const res = await fetch(`https://api.bunny.net/dnszone/${id}`, {
      headers: {
        AccessKey: this.#token,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      if (this.#debug) {
        const str = await res.text()

        console.error(str)
      }

      return {
        data: null,
        error: true,
        statusCode: res.status
      }
    }

    const json = await res.json()

    const data: DNSZone = {
      id: json.Id,
      domain: json.Domain,
      records: json.records ? json.records.map((record: any) => parseRecordFromJson(record)) : [],
      dateModified: json.DateModified,
      dateCreated: json.DateCreated,
      nameServersDetected: json.NameserversDetected,
      customNameServersEnabled: json.CustomNameserversEnabled,
      nameServer1: json.Nameserver1,
      nameServer2: json.Nameserver2,
      soaEmail: json.SoaEmail,
      nameServersNextCheck: json.NameserversNextCheck,
      loggingEnabled: json.LoggingEnabled,
      loggingIpAnonymizationEnabled: json.LoggingIPAnonymizationEnabled,
      logAnonymizationType: LOG_ANONYMIZATION_TYPE[json.LogAnonymizationType]
    }

    return {
      data,
      error: false
    }
  }

  deleteZone = async (id: number): Promise<BasicResponse<null>> => {
    const res = await fetch(`https://api.bunny.net/dnszone/${id}`, {
      method: 'DELETE',
      headers: {
        AccessKey: this.#token,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      if (this.#debug) {
        const str = await res.text()

        console.error(str)
      }

      return {
        data: null,
        error: true,
        statusCode: res.status
      }
    }

    return {
      data: null,
      error: false
    }
  }

  addRecord = async (zoneId: number, options: AddRecordOptions): Promise<BasicResponse<DNSRecord>> => {
    const res = await fetch(`https://api.bunny.net/dnszone/${zoneId}/records`, {
      method: 'PUT',
      headers: {
        AccessKey: this.#token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Type: RECORD_TYPES.indexOf(options.type),
        Ttl: options.ttl ?? 86400, // 24h
        Name: options.name,
        Value: options.value,
        Weight: options.weight,
        Priority: options.priority,
        Flags: options.flags,
        Tag: options.tag,
        Port: options.port,
        PullZoneId: options.pullZoneId,
        ScriptId: options.scriptId,
        Accelerated: options.accelerated === true,
        ...(options.monitorType && { MonitorType: MONITOR_TYPES.indexOf(options.monitorType) }),
        GeolocationLatitude: options.geolocationLatitude,
        GeolocationLongitude: options.geolocationLongitude,
        ...(options.smartRoutingType && { SmartRoutingType: SMART_ROUTING_TYPES.indexOf(options.smartRoutingType) }),
        Disabled: options.disabled === true,
        EnvironmentVariables: options.environmentVariables,
        Comment: options.comment
      })
    })

    if (!res.ok) {
      if (this.#debug) {
        const str = await res.text()

        console.error(str)
      }

      return {
        data: null,
        error: true,
        statusCode: res.status
      }
    }

    const json = await res.json()

    return {
      data: parseRecordFromJson(json),
      error: false
    }
  }

  updateRecord = async (zoneId: number, id: number, options: UpdateRecordOptions): Promise<BasicResponse<null>> => {
    const res = await fetch(`https://api.bunny.net/dnszone/${zoneId}/records/${id}`, {
      method: 'POST',
      headers: {
        AccessKey: this.#token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...(options.type && { Type: RECORD_TYPES.indexOf(options.type) }),
        Ttl: options.ttl ?? 86400, // 24h
        Name: options.name,
        Value: options.value,
        Weight: options.weight,
        Priority: options.priority,
        Flags: options.flags,
        Tag: options.tag,
        Port: options.port,
        PullZoneId: options.pullZoneId,
        ScriptId: options.scriptId,
        Accelerated: options.accelerated === true,
        ...(options.monitorType && { MonitorType: MONITOR_TYPES.indexOf(options.monitorType) }),
        GeolocationLatitude: options.geolocationLatitude,
        GeolocationLongitude: options.geolocationLongitude,
        ...(options.smartRoutingType && { SmartRoutingType: SMART_ROUTING_TYPES.indexOf(options.smartRoutingType) }),
        Disabled: options.disabled === true,
        EnvironmentVariables: options.environmentVariables,
        Comment: options.comment
      })
    })

    if (!res.ok) {
      if (this.#debug) {
        const str = await res.text()

        console.error(str)
      }

      return {
        data: null,
        error: true,
        statusCode: res.status
      }
    }

    return {
      data: null,
      error: false
    }
  }

  deleteRecord = async (zoneId: number, id: number): Promise<BasicResponse<null>> => {
    const res = await fetch(`https://api.bunny.net/dnszone/${zoneId}/records/${id}`, {
      method: 'DELETE',
      headers: {
        AccessKey: this.#token,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      if (this.#debug) {
        const str = await res.text()

        console.error(str)
      }

      return {
        data: null,
        error: true,
        statusCode: res.status
      }
    }

    return {
      data: null,
      error: false
    }
  }
}
