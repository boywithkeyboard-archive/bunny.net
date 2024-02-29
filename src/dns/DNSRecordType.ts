export const RECORD_TYPES: DNSRecordType[] = [
  'A',
  'AAAA',
  'CNAME',
  'TXT',
  'MX',
  'Redirect',
  'Flatten',
  'PullZone',
  'SRV',
  'CAA',
  'PTR',
  'SCRIPT',
  'NS'
]

export type DNSRecordType =
  | 'A'
  | 'AAAA'
  | 'CNAME'
  | 'TXT'
  | 'MX'
  | 'Redirect'
  | 'Flatten'
  | 'PullZone'
  | 'SRV'
  | 'CAA'
  | 'PTR'
  | 'SCRIPT'
  | 'NS'
