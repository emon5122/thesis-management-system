import { prisma } from "@/lib/prisma";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest, { params }: ParamsType) => {
    const token = await getToken({ req });
    if (!token || !token?.sub || token?.role !== "STUDENT") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      const evaluatorCount = await prisma.thesis.findMany({
        where: {
          studentId: token.sub,
        },
        select: {
          evaluation: true,
        },
      });
      const evaluationCount = evaluatorCount.reduce(
        (count, thesis) => count + thesis.evaluation.length,
        0
      );
  
      return NextResponse.json({
        evaluationCount,
      });
  
    } catch (e) {
      return NextResponse.json(e, {status:500});
    } finally {
      await prisma.$disconnect();
    }
  };