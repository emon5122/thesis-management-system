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
    const evaluationList = await prisma.evaluation.findMany({
      where: {
        thesis: {
          studentId: params.id,
        },
      },
      select: {
        m1: true,
        m2: true,
        m3: true,
        m4: true,
        m5: true,
        m6: true,
        evaluator: { select: { name: true } },
        comment: true,
      },
    });

    return NextResponse.json(evaluationList);
  } catch (e) {
    return NextResponse.json(e, {status:500});
  } finally {
    await prisma.$disconnect();
  }
};
