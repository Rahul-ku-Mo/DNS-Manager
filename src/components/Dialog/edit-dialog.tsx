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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Row } from "@tanstack/react-table";
import React from "react";

import { DNS, Record } from "@/types";
import useDNSRecord from "@/hooks/useDNSRecord";
import { useState } from "react";
import { toast } from "sonner";

interface EditDialogProps {
  row: Row<DNS>;
}
const EditDialog: React.FC<EditDialogProps> = ({ row }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [values, setValues] = useState<Record>({
    domain: row.getValue("domain"),
    type: row.getValue("type"),
    ttl: row.getValue("ttl"),
    value: row.getValue("value"),
    priority: row.getValue("priority"),
    weight: row.getValue("weight"),
    port: row.getValue("port"),
    target: row.getValue("target"),
    keyTag: row.getValue("keyTag"),
    algorithm: row.getValue("algorithm"),
    digestType: row.getValue("digestType"),
    digest: row.getValue("digest"),
  });

  const updateDNSRecordMutation = useDNSRecord(row.getValue("id"));

  const handleChange =
    (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        prop === "ttl" ||
        prop === "priority" ||
        prop === "weight" ||
        prop === "port" ||
        prop === "keyTag" ||
        prop === "algorithm" ||
        prop === "digestType"
          ? parseInt(e.target.value)
          : e.target.value;
      setValues({ ...values, [prop]: value });
    };

  const handleSelectChange = (field: string) => (newValue: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !values.domain ||
      !values.type ||
      !values.ttl ||
      !values.value ||
      (values.type === "MX" && !values.priority) || // Check if priority is set for MX records
      (values.type === "SRV" &&
        (!values.weight || !values.port || !values.target)) || // Check if weight, port, and target are set for SRV records
      (values.type === "DS" &&
        (!values.keyTag ||
          !values.algorithm ||
          !values.digestType ||
          !values.digest)) // Check if keyTag, algorithm, digestType, and digest are set for DS records
    ) {
      toast.error("Values cannot be empty!");
      return;
    }

    updateDNSRecordMutation.mutate(values);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="py-2 h-9 justify-start ">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>DNS Record</DialogTitle>
          <DialogDescription>
            Edit your DNS record here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="domain">Domain</Label>
            <Input
              id="domain"
              placeholder="example.com"
              value={values.domain}
              onChange={handleChange("domain")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="record-type">Record Type</Label>
              <Select
                value={values.type}
                onValueChange={handleSelectChange("type")}
              >
                <SelectTrigger id="record-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="AAAA">AAAA</SelectItem>
                  <SelectItem value="CNAME">CNAME</SelectItem>
                  <SelectItem value="MX">MX</SelectItem>
                  <SelectItem value="NS">NS</SelectItem>
                  <SelectItem value="PTR">PTR</SelectItem>
                  <SelectItem value="SOA">SOA</SelectItem>
                  <SelectItem value="SRV">SRV</SelectItem>
                  <SelectItem value="TXT">TXT</SelectItem>
                  <SelectItem value="DS">DS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="domain">Time to Live</Label>
              <Input
                id="domain"
                type="number"
                min="0"
                value={values.ttl}
                placeholder="Time to live"
                onChange={handleChange("ttl")}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              placeholder="192.0.2.1"
              value={values.value}
              onChange={handleChange("value")}
            />
          </div>
          {values.type === "MX" && (
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min="0"
                max="65535"
                placeholder="Priority"
                onChange={handleChange("priority")}
                value={values.priority}
              />
            </div>
          )}
          {values.type === "SRV" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  placeholder="Weight"
                  onChange={handleChange("weight")}
                  value={values.weight}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="number"
                  min="0"
                  placeholder="Port"
                  onChange={handleChange("port")}
                  value={values.port}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  placeholder="Target"
                  onChange={handleChange("target")}
                  value={values.target}
                />
              </div>
            </>
          )}
          {values.type === "DS" && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="keyTag">Key Tag</Label>
                <Input
                  id="keyTag"
                  type="number"
                  min="0"
                  placeholder="Key Tag"
                  onChange={handleChange("keyTag")}
                  value={values.keyTag}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="algorithm">Algorithm</Label>
                <Input
                  id="algorithm"
                  type="number"
                  min="0"
                  placeholder="Algorithm"
                  onChange={handleChange("algorithm")}
                  value={values.algorithm}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="digestType">Digest Type</Label>
                <Input
                  id="digestType"
                  type="number"
                  min="0"
                  placeholder="Digest Type"
                  onChange={handleChange("digestType")}
                  value={values.digestType}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="digest">Digest</Label>
                <Input
                  id="digest"
                  placeholder="Digest"
                  onChange={handleChange("digest")}
                  value={values.digest}
                />
              </div>
            </>
          )}
          <DialogFooter>
            <Button
              disabled={
                !values.domain || !values.type || !values.ttl || !values.value
              }
              type="submit"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
