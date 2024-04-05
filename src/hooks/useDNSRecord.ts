import { useQueryClient, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Record } from "@/types";
import { toast } from "sonner";
import { updateDNSRecord } from "@/apis";

const useDNSRecord = (recordId: string) => {
  const queryClient = useQueryClient();

  const accessToken = Cookies.get("token") as string;

  const updateDNSRecordMutation = useMutation({
    mutationFn: async (values: Record) =>
      await updateDNSRecord(accessToken, values, recordId),
    onSuccess: () => {
      toast.success("DNS record updated successfully!!");
    },
    onError: () => {
      toast.error("DNS record not updated!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dns-records"] });
    },
  });

  return updateDNSRecordMutation;
};

export default useDNSRecord;
