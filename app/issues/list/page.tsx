import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "../IssueActions";
import { Status } from "@prisma/client";

import Pagination from "@/app/components/Pagination";
import IssuesTable, { IssueQuery, validIssueColumns } from "./IssuesTable";

const validStatuses = Object.keys(Status);

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const { status, orderby } = searchParams;
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issueWhereStatement = {
    status: (() => (validStatuses.includes(status) ? status : undefined))(),
  };
  const issuesPromise = prisma.issue.findMany({
    where: issueWhereStatement,
    orderBy: (() => {
      if (!orderby && !validIssueColumns.includes(orderby)) return undefined;
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
      <IssuesTable
        searchParams={searchParams}
        issues={issues}
        issueCount={issueCount}
      />
      <Flex justify="center" mt="5">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </Flex>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
