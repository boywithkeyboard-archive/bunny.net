import { DNSRecord } from './DNSRecord'
import { RECORD_TYPES } from './DNSRecordType'
import { MONITOR_STATUSES } from './MonitorStatus'
import { MONITOR_TYPES } from './MonitorType'
import { SMART_ROUTING_TYPES } from './SmartRoutingType'

export function parseRecordFromJson(json: any): DNSRecord {
  return {
    id: json.Id,
    type: RECORD_TYPES[json.Type],
    ttl: json.Ttl,
    value: json.Value,
    name: json.Name,
    weight: json.Weight,
    priority: json.Priority,
    port: json.Port,
    flags: json.Flags,
    tag: json.Tag,
    accelerated: json.Accelerated,
    acceleratedPullZoneId: json.AcceleratedPullZoneId,
    linkName: json.LinkName,
    ...(json.IPGeoLocationInfo && {
      ipGeoLocationInfo: {
        countryCode: json.IPGeoLocationInfo.CountryCode,
        country: json.IPGeoLocationInfo.Country,
        asn: json.IPGeoLocationInfo.ASN,
        organizationName: json.IPGeoLocationInfo.OrganizationName,
        city: json.IPGeoLocationInfo.City
      }
    }),
    ...(json.GeolocationInfo && {
      geolocationInfo: {
        country: json.GeolocationInfo.Country,
        city: json.GeolocationInfo.City,
        latitude: json.GeolocationInfo.Latitude,
        longitude: json.GeolocationInfo.Longitude
      }
    }),
    monitorStatus: MONITOR_STATUSES[json.MonitorStatus],
    monitorType: MONITOR_TYPES[json.MonitorType],
    geolocationLatitude: json.GeolocationLatitude,
    geolocationLongitude: json.GeolocationLongitude,
    enviromentalVariables: json.EnviromentalVariables,
    latencyZone: json.LatencyZone,
    smartRoutingType: SMART_ROUTING_TYPES[json.SmartRoutingType],
    disabled: json.Disabled,
    comment: json.Comment
  }
}
