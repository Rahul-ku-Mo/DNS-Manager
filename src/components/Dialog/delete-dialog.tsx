import { DeleteDNSRecord } from "@/apis";
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
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface DeleteDialogProps {
  recordId: string;
}
const DeleteDialog: React.FC<DeleteDialogProps> = ({ recordId }) => {
  const accessToken = Cookies.get("token") as string;

  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const DeleteRecordMutation = useMutation({
    mutationFn: async (value: string) =>
      await DeleteDNSRecord(accessToken, value),
    onSuccess: () => {
      toast("DNS record deleted successfully!!");
    },
    onError: () => {
      toast("DNS record was not deleted!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dns-records"] });

      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Record</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this record?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="bg-red-400 hover:bg-red-600 transition-all ease-in-out duration-300"
            size="lg"
            onClick={() => {
              DeleteRecordMutation.mutate(recordId);
            }}
          >
            Yes
          </Button>
          <Button variant="outline" size="lg">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
