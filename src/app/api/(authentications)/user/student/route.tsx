import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },
      select: { id: true, name: true },
    });
    return NextResponse.json(students, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
