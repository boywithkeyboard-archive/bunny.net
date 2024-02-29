import { DNSRecordType } from './DNSRecordType'
import { MonitorStatus } from './MonitorStatus'
import { MonitorType } from './MonitorType'
import { SmartRoutingType } from './SmartRoutingType'

export type DNSRecord = {
  id: number
  type: DNSRecordType
  ttl: number
  value?: string
  name?: string
  weight: number
  priority: number
  port: number
  flags: number
  tag?: string
  accelerated: boolean
  acceleratedPullZoneId: boolean
  linkName?: string
  ipGeoLocationInfo?: {
    countryCode?: string
    country?: string
    asn: number
    organizationName?: string
    city?: string
  }
  geolocationInfo?: {
    country?: string
    city?: string
    latitude: number
    longitude: number
  }
  monitorStatus: MonitorStatus
  monitorType: MonitorType
  geolocationLatitude: number
  geolocationLongitude: number
  environmentVariables?: Array<{
    name: string
    value: string
  }>
  latencyZone?: string
  smartRoutingType: SmartRoutingType
  disabled: boolean
  comment?: string
}
