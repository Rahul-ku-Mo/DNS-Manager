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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDNSRecord } from "@/apis";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Record } from "@/types";

import { useState, useEffect } from "react";

const CreateDialog = () => {
  const accessToken = Cookies.get("token") as string;

  const [open, setOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const [values, setValues] = useState<Record>({
    domain: "",
    type: "A",
    value: "",
    ttl: 0,
    priority: 0,
    weight: 0,
    port: 0,
    target: "",
    keyTag: 0,
    algorithm: 0,
    digestType: 0,
    digest: "",
  });

  const handleChange =
    (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = prop === "ttl" ? parseInt(e.target.value) : e.target.value;
      setValues({ ...values, [prop]: value });
    };

  const handleSelectChange = (field: string) => (newValue: string) => {
    setValues((prevValues) => ({ ...prevValues, [field]: newValue }));
  };

  const createRecordMutation = useMutation({
    mutationFn: async (values: Record) =>
      await createDNSRecord(accessToken, values),
    onSuccess: () => {
      toast("DNS record created successfully!!");
    },
    onError: () => {
      toast("DNS record not created!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dns-records"] });

      setValues({
        domain: "",
        type: "A",
        value: "",
        ttl: 0,
        priority: 0,
        weight: 0,
        port: 0,
        target: "",
        keyTag: 0,
        algorithm: 0,
        digestType: 0,
        digest: "",
      });

      setOpen(false);
    },
  });

  useEffect(() => {
    if (values.type !== "MX") {
      setValues((prevValues) => ({ ...prevValues, priority: 0 }));
    }

    if (values.type !== "SRV") {
      setValues((prevValues) => ({
        ...prevValues,
        weight: 0,
        port: 0,
        target: "",
      }));
    }

    if (values.type !== "DS") {
      setValues((prevValues) => ({
        ...prevValues,
        keyTag: 0,
        algorithm: 0,
        digestType: 0,
        digest: "",
      }));
    }
  }, [values.type]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-2 h-9">
          Create DNS Record
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>DNS Record</DialogTitle>
          <DialogDescription>
            Create your DNS record here. Click create record when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-2"
          onSubmit={async (e) => {
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

            createRecordMutation.mutate(values);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="domain">Domain Name</Label>
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
                placeholder="Time to live"
                onChange={handleChange("ttl")}
                value={values.ttl}
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
              type="submit"
              disabled={
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
              }
            >
              Create Record
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
