import { DNS, Record } from "@/types";
import axios from "axios";

export const fetchDNSRecords: (accessToken: string) => Promise<DNS[]> = async (
  accessToken: string
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/domain/records`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export const createDNSRecord: (
  accessToken: string,
  record: Record
) => Promise<DNS[]> = async (accessToken: string, record: Record) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/domain/records`,
    {
      record: record,
      hostedZoneData: {
        name: record.domain,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export const DeleteDNSRecord: (
  accessToken: string,
  recordId: string
) => Promise<DNS[]> = async (accessToken: string, recordId: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/domain/records/${recordId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export const updateDNSRecord: (
  accessToken: string,
  record: Record,
  recordId: string
) => Promise<DNS[]> = async (accessToken, record, recordId) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/domain/records/${recordId}`,
    {
      record,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};

export const createBulkDNSRecords: (
  accessToken: string,
  records: Record[]
) => Promise<DNS[]> = async (accessToken: string, records: Record[]) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/domain/records/bulk`,
    { records },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200 || response.status === 201) {
    return response.data.data;
  } else {
    throw new Error(`Request failed with status code ${response.status}`);
  }
};
