import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="3rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
