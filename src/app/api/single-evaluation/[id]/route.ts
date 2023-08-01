import { prisma } from "@/lib/prisma";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role === "STUDENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        thesis: {
          studentId: params.id,
        },
        evaluatorID: token.sub
      },
      select: {
        m1: true,
        m2: true,
        m3: true,
        m4: true,
        m5: true,
        m6: true,
        comment: true,
      },
    });
    return NextResponse.json(evaluation);
  }
   catch (e) {
    return NextResponse.json(e, {status:500});
  } finally {
    await prisma.$disconnect();
  }
};
