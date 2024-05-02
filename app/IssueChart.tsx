"use client";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
import { Card } from "@radix-ui/themes";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data: {
    label: string;
    value: number;
  }[] = [
    { label: "Open", value: open },
    { label: "Closed", value: closed },
    { label: "In Progress", value: inProgress },
  ];
  return (
    <Card style={{ flex: 1 }}>
      <ResponsiveContainer width="100%">
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
