import { DNSRecord } from './DNSRecord'
import { LogAnonymizationType } from './LogAnonymizationType'

export type DNSZone = {
  id: number
  domain?: string
  records: DNSRecord[]
  dateModified: string
  dateCreated: string
  nameServersDetected: boolean
  customNameServersEnabled: boolean
  nameServer1?: string
  nameServer2?: string
  soaEmail?: string
  nameServersNextCheck: string
  loggingEnabled: boolean
  loggingIpAnonymizationEnabled: boolean
  logAnonymizationType: LogAnonymizationType
}
