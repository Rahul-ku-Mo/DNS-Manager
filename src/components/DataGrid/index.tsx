import { DataTable } from "./data-table";
import { columns } from "./columns";

import { useDNSRecords } from "@/hooks/useQueries";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

const DataGrid: React.FC = () => {
  const accessToken = Cookies.get("token") as string;

  const { data, isPending } = useDNSRecords(accessToken);

  if (isPending)
    return (
      <div className="relative">
        <div className="h-full w-full absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin transition ease-linear" />
        </div>
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default DataGrid;
