import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  const token = await getToken({ req });
    if (!token || !token?.sub || token?.role !=="TEACHER") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  try {
    const user = await prisma.thesis.findMany({
      where: {
        supervisorId: token.sub
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};
