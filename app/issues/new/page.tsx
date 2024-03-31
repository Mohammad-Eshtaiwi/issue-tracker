"use client"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import axios from "axios";
import { useRouter } from "next/navigation";


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
    const router = useRouter()
    const onSubmit: SubmitHandler<IssueForm> = async (data) => {
        console.log(data);
        await axios.post("/api/issues", data);
        router.push("/issues")
    }
    return (
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root placeholder="Title" {...register("title")} />
            <Controller control={control} name="description" render={({ field }) => <SimpleMDE placeholder="description" {...field} />} />


            <Button>Submit New Issue</Button>
        </form>
    )
}

export default NewIssuePage