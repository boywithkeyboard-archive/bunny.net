export const SMART_ROUTING_TYPES: SmartRoutingType[] = [
  'none',
  'latency',
  'geolocation'
]

export type SmartRoutingType =
  | 'none'
  | 'latency'
  | 'geolocation'
