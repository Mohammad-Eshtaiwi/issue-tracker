import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge /* Link */ } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const IssuesTable = async ({ searchParams, issues, issueCount }: Props) => {
  const { orderby } = searchParams;
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Flex gap="1" align="center">
                  <Link
                    href={{ query: { ...searchParams, orderby: column.value } }}
                  >
                    {column.label}
                  </Link>
                  {column.value === orderby && (
                    <ArrowUpIcon className="inline " />
                  )}
                </Flex>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.ColumnHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="sm:hidden">{issue.status}</div>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                {<IssueStatusBadge status={issue.status} />}
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.ColumnHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  {
    value: "title",
    label: "Issue",
  },
  {
    value: "status",
    label: "Status",
    className: "hidden md:table-cell",
  },
  {
    value: "createdAt",
    label: "Created",
    className: "hidden md:table-cell",
  },
];
export const validIssueColumns = columns.map((col) => col.value);

export interface IssueQuery {
  status: Status;
  orderby: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
  issueCount: number;
}

export default IssuesTable;
