import { Flex } from "@radix-ui/themes";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";

type IssueStatusStatistics = {
  [key in Status]: number;
};

export default async function Home() {
  const issuesStatusStatisticsDbResult = await prisma.issue.groupBy({
    by: "status",
    _count: {
      status: true,
    },
  });

  const issuesStatusStatistics: IssueStatusStatistics =
    issuesStatusStatisticsDbResult.reduce(
      (obj, current) => ({
        ...obj,
        [current.status]: current._count.status,
      }),
      {} as IssueStatusStatistics
    );

  return (
    <Flex direction={"column"} gap={"5"}>
      <LatestIssues />
      <IssuesSummary
        open={issuesStatusStatistics.OPEN}
        inProgress={issuesStatusStatistics.IN_PROGRESS}
        closed={issuesStatusStatistics.CLOSED}
      />
      <IssueChart
        open={issuesStatusStatistics.OPEN}
        inProgress={issuesStatusStatistics.IN_PROGRESS}
        closed={issuesStatusStatistics.CLOSED}
      />
    </Flex>
  );
}
