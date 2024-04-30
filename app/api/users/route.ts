import prisma from "@/prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { TypeOf } from "zod";
import { issueSchema } from "../../validationSchemas";
import protectRoute from "@/app/auth/protectRoute";

// Define a type using TypeOf to get the TypeScript type from Zod schema
type CreateIssueRequestBody = TypeOf<typeof issueSchema>;

export async function GET(request: NextRequest) {
  try {
    await protectRoute();

    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    if (error instanceof NextResponse) return error;
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
