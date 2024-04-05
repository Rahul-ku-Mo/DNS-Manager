import { fetchDNSRecords } from "@/apis";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { DNS } from "@/types";

export const useDNSRecords = (
  accessToken: string
): UseQueryResult<DNS[], unknown> => {
  return useQuery<DNS[], unknown>({
    queryKey: ["dns-records"],
    queryFn: async () => await fetchDNSRecords(accessToken),
  });
};
