import prisma from "@/prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge /* Link */ } from "@/app/components";
import IssueActions from "../IssueActions";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const validStatuses = Object.keys(Status);

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderby: keyof Issue; page: string };
}) => {
  const { status, orderby } = searchParams;
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  console.log((currentPage - 1) * pageSize);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
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
  const issueWhereStatement = {
    status: (() => (validStatuses.includes(status) ? status : undefined))(),
  };
  const issuesPromise = prisma.issue.findMany({
    where: issueWhereStatement,
    orderBy: (() => {
      const validKeys = columns.map((col) => col.value);
      if (!orderby && !validKeys.includes(orderby)) return undefined;
      return { [orderby]: "asc" };
    })(),
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const issueCountPromise = prisma.issue.count({
    where: issueWhereStatement,
  });

  const [issues, issueCount] = await Promise.all([
    issuesPromise,
    issueCountPromise,
  ]);

  return (
    <div>
      <IssueActions />
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
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
