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
    const evaluationList = await prisma.evaluation.findMany({
      where: {
        thesis: {
          studentId: token.sub,
        },
      },
      select: {
        m1: true,
        m2: true,
        m3: true,
        m4: true,
        m5: true,
        m6: true,
      },
    });
    let sumM1: number = 0;
    let sumM2: number = 0;
    let sumM3: number = 0;
    let sumM4: number = 0;
    let sumM5: number = 0;
    let sumM6: number = 0;

    evaluationList.map((evaluationItem) => {
      if (evaluationItem.m1) {
        sumM1 = sumM1 + evaluationItem.m1;
      }
      if (evaluationItem.m2) {
        sumM2 = sumM2 + evaluationItem.m2;
      }
      if (evaluationItem.m3) {
        sumM3 = sumM3 + evaluationItem.m3;
      }
      if (evaluationItem.m4) {
        sumM4 = sumM4 + evaluationItem.m4;
      }
      if (evaluationItem.m5) {
        sumM5 = sumM5 + evaluationItem.m5;
      }
      if (evaluationItem.m6) {
        sumM6 = sumM6 + evaluationItem.m6;
      }
    });
    const avgM1 = sumM1 / evaluationList.length;
    const avgM2 = sumM2 / evaluationList.length;
    const avgM3 = sumM3 / evaluationList.length;
    const avgM4 = sumM4 / evaluationList.length;
    const avgM5 = sumM5 / evaluationList.length;
    const avgM6 = sumM6 / evaluationList.length;
    const avgTotal = avgM1 + avgM2 + avgM3 + avgM4 + avgM5 + avgM6;

    return NextResponse.json({
      m1: avgM1,
      m2: avgM2,
      m3: avgM3,
      m4: avgM4,
      m5: avgM5,
      m6: avgM6,
      total: avgTotal,
    });
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};
