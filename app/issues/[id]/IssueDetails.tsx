import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import { IssueStatusBadge } from "../../components";
import { Issue } from "@prisma/client";

export const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3 items-center my-3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-3">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </>
  );
};
