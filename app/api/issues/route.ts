import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { TypeOf } from "zod";
import { issueSchema } from "../../validationSchemas";
import protectRoute from "@/app/auth/protectRoute";

// Define a type using TypeOf to get the TypeScript type from Zod schema
type CreateIssueRequestBody = TypeOf<typeof issueSchema>;

export async function POST(request: NextRequest) {
  try {
    await protectRoute()
    const body = (await request.json()) as CreateIssueRequestBody;
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    if (error instanceof NextResponse) return error;
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
