import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBulkDNSRecords } from "@/apis";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Record } from "@/types";
import BulkInputFile from "../InputFile/file-input";
import { useState } from "react";

import { DSVRowArray } from "d3";

const CreateBulkDialog = () => {
  const accessToken = Cookies.get("token") as string;

  const queryClient = useQueryClient();

  const [data, setData] = useState<DSVRowArray<string> | null>(null);

  const handleData = (data: DSVRowArray<string>) => {
    setData(data);
  };

  const createBulkRecordMutation = useMutation({
    mutationFn: async (values: unknown) =>
      await createBulkDNSRecords(accessToken, values as Record[]),
    onSuccess: () => {
      toast("DNS Bulk record created successfully!!");
    },
    onError: () => {
      toast("DNS Bulk record not created!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dns-records"] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-2 h-9">
          Create from JSON/CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bulk DNS Record</DialogTitle>
          <DialogDescription>
            Create DNS record from json/csv file. Click create bulk records when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <BulkInputFile handleData={handleData} />
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              if (data) {
                createBulkRecordMutation.mutate(data);
              } else {
                toast.error("Please upload a file");
                return;
              }
            }}
          >
            Create Bulk Records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBulkDialog;
