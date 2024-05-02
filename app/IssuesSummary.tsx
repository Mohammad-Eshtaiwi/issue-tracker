import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
  const cards: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap={"5"}>
      {cards.map((card) => (
        <Card key={card.label}>
          <Flex direction={"column"} gap={"1"}>
            <Link
              href={`/issues/list?status=${card.status}`}
              className="text-sm font-medium"
            >
              {card.label}
            </Link>
            <Text size={"5"} weight={"bold"}>
              {card.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
