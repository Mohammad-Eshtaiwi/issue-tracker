import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "./authOptions";

const protectRoute = async () => {
  const session = await getServerSession(authOptions);
  if (!session) throw NextResponse.json({}, { status: 401 });
  return session;
};

export default protectRoute;
