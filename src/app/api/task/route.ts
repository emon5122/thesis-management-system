import { prisma } from "@/lib/prisma";

import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token || !token?.sub) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const tasks = await prisma.task.findMany({
      where: {
        thesis: { studentId: token?.sub },
      },
    });
    return NextResponse.json(tasks);
  } catch (e) {
    return NextResponse.json(e, {status:500});
  } finally {
    await prisma.$disconnect();
  }
};
