import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token || !token?.sub  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const student = await prisma.user.findUnique({
      where: { id: token.sub },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
        noticesAsStudent: { select: { details: true } },
        thesisAsStudent: {
          select: {
            id: true,
            name: true,
            supervisorId: true,
            Task: { select: { name: true, details: true, isCompleted: true } },
            teacher: { select: { id: true, name: true } },
          },
        },
      },
    });
    return NextResponse.json(student, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
