import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { TypeOf, z } from "zod";
const createIssueSchema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string().min(1, "title is required"),
});

// Define a type using TypeOf to get the TypeScript type from Zod schema
type CreateIssueRequestBody = TypeOf<typeof createIssueSchema>;

export async function POST(request: NextRequest) {
    const body = await request.json() as CreateIssueRequestBody;
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })
    return NextResponse.json(newIssue, { status: 201 })
}
