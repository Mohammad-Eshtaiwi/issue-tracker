"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createIssueSchema } from "@/app/validationSchemas";
import { TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMesage";


// Define a type using TypeOf to get the TypeScript type from Zod schema
type IssueForm = TypeOf<typeof createIssueSchema>;



const NewIssuePage = () => {
    const {
        register,
        control,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        try {
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            console.log(error);
            setError("unexpected error occurred")
        }
    };
    console.log(error);

    return (
        <div className="space-y-3 max-w-xl">
            {error && <Callout.Root color="red">
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder="Title" {...register("title")} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <SimpleMDE placeholder="description" {...field} />
                    )}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
