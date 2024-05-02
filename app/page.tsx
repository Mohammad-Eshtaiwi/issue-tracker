import { Flex, Grid } from "@radix-ui/themes";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

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
    <Grid
      columns={{
        initial: "1",
        md: "2",
      }}
      gap={"5"}
    >
      <Flex direction={"column"} gap={"5"}>
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
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of of project issues",
};
