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
      const teacherCount = await prisma.thesis.findMany({
        where: {
          studentId: params.id,
        },
        select: {
          teacher: true,
        },
      });
      const evaluatorCount = await prisma.thesis.findMany({
        where: {
          studentId: params.id,
        },
        select: {
          evaluation: true,
        },
      });
    
  
      return NextResponse.json({
        isGrade: !Boolean(evaluatorCount.length -teacherCount.length+1),
      });
  
    } catch (e) {
      return NextResponse.json(e, {status:500});
    } finally {
      await prisma.$disconnect();
    }
  };