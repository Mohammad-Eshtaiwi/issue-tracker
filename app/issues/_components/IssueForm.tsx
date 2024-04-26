"use client";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { issueSchema } from "@/app/validationSchemas";
import { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// Define a type using TypeOf to get the TypeScript type from Zod schema
type IssueFormData = TypeOf<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setError("unexpected error occurred");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-3 max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
