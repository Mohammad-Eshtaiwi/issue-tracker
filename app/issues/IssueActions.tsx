import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./list/IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex className="mb-5" justify={"between"}>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
      <IssueStatusFilter />
    </Flex>
  );
};

export default IssueActions;
