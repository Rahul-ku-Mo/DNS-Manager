import { Input } from "@/components/ui/input";
import * as d3 from "d3";
import { DSVRowArray } from "d3";

type BulkInputFileProps = {
  data?: DSVRowArray<string> | null;
  handleData: (data: DSVRowArray<string>) => void;
};

const BulkInputFile: React.FC<BulkInputFileProps> = ({ handleData }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    console.log(file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (file.type === "text/csv") {
        const csvData = d3.csvParse(event?.target?.result as string);
        handleData(csvData);
      } else {
        const jsonData = JSON.parse(event.target?.result as string);
        handleData(jsonData);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Input
      id="csv/json-file"
      type="file"
      className="appearance-none truncate w-full"
      onChange={handleFileChange}
    />
  );
};

export default BulkInputFile;
