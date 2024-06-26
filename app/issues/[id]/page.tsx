import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import { IssueDetails } from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import { Issue } from "@prisma/client";

interface Props {
  params: { id: string };
}

const getAllIssues = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const issue = await getAllIssues(parseInt(params.id));
  if (!issue) return notFound();

  return (
    <Grid
      columns={{
        initial: "1",
        sm: "5",
      }}
      gap="5"
    >
      <Box className="sm:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap={"4"} direction="column">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await getAllIssues(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Description of issue " + issue?.id,
  };
};

export default IssueDetailsPage;
