export type RecordType =
  | "A"
  | "AAAA"
  | "CNAME"
  | "MX"
  | "NS"
  | "PTR"
  | "SOA"
  | "SRV"
  | "TXT"
  | "DS";

export type DNS = {
  id: string;
  domain: string;
  type: RecordType; // Valid record types (e.g., "A", "AAAA", "CNAME", etc.)
  value: string; // Value format depends on record type
  ttl: number; // Time-to-live in seconds
  priority?: number; // Required for MX and SRV records
  weight?: number; // Required for SRV records
  port?: number; // Required for SRV records
  target?: string; // Required for SRV records
  keyTag?: number; // Required for DS records
  algorithm?: number; // Required for DS records
  digestType?: number; // Required for DS records
  digest?: string; // Required for DS records
};

export type Record = Omit<DNS, "id">;

export const dummyData: DNS[] = [
  {
    id: "1",
    domain: "example.com",
    type: "A",
    value: "192.0.2.1",
    ttl: 3600,
  },
  {
    id: "2",
    domain: "example.com",
    type: "AAAA",
    value: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    ttl: 3600,
  },
  {
    id: "3",
    domain: "example.com",
    type: "CNAME",
    value: "www.example.com",
    ttl: 3600,
  },
  // Add more records as needed
];
