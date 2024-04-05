import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDNS() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="AAAA">AAAA</SelectItem>
          <SelectItem value="CNAME">CNAME</SelectItem>
          <SelectItem value="MX">MX</SelectItem>
          <SelectItem value="NS">NS</SelectItem>
          <SelectItem value="PTR">PTR</SelectItem>
          <SelectItem value="SOA">SOA</SelectItem>
          <SelectItem value="SRV">SRV</SelectItem>
          <SelectItem value="TXT">TXT</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
