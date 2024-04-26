import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { TypeOf } from "zod";
import { issueSchema } from "../../validationSchemas";
// Define a type using TypeOf to get the TypeScript type from Zod schema
type CreateIssueRequestBody = TypeOf<typeof issueSchema>;

export async function POST(request: NextRequest) {
    const body = await request.json() as CreateIssueRequestBody;
    const validation = issueSchema.safeParse(body);
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
