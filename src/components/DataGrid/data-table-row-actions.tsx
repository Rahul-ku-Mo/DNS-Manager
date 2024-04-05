import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditDialog from "../Dialog/edit-dialog";
import DeleteDialog from "../Dialog/delete-dialog";
import { Row } from "@tanstack/react-table";
import { DNS } from "@/types";

interface DataTableRowActionsProps {
  row: Row<DNS>;
}

export const DataTableRowActions: React.FC<DataTableRowActionsProps> = ({
  row,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit flex flex-col">
        <EditDialog row={row} />

        <DeleteDialog recordId={row.getValue("id")} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
