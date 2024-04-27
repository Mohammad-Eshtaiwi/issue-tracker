import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params, "params");

    const body = await req.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedIssue, { status: 201 });
  } catch (error) {
    // Handle any unexpected errors
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}