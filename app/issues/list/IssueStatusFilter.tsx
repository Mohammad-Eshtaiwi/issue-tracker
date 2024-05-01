"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: {
  label: String;
  value: Status | "ALL";
}[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const handleOnChange = (status: string) => {
    let url = "/issues/list";
    if (status !== "ALL") url += `?status=${status}`;
    router.push(url);
  };
  return (
    <Select.Root defaultValue={"ALL"} onValueChange={handleOnChange}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {statuses?.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
