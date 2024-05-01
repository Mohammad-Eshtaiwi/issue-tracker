import protectRoute from "@/app/auth/protectRoute";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await protectRoute();
    const body = await req.json();
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    //
    const { assignedToUserId, title, description } = body;
    if (assignedToUserId) {
      const user = await prisma.user.findUnique({
        where: {
          id: assignedToUserId,
        },
      });
      if (!user)
        return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }

    //

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
        title,
        description,
        assignedToUserId,
      },
    });

    return NextResponse.json(updatedIssue, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    if (error instanceof NextResponse) return error;

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await protectRoute();

    const issue = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
    }

    await prisma.issue.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    if (error instanceof NextResponse) return error;

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
