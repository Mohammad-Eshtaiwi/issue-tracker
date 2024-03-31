"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const {
        register,
        control,
        handleSubmit,
        // watch,
        // formState: { errors },
    } = useForm<IssueForm>();
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
                <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                        <SimpleMDE placeholder="description" {...field} />
                    )}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
