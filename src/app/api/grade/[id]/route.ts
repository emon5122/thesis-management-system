import { prisma } from "@/lib/prisma";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req: any, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "TEACHER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const theses = await prisma.thesis.findMany({
        where: {
            studentId: params.id,
           },
      select: {
        
        supervisorId: true,
    
      },
    });
    console.log(theses, "dwad")
    return NextResponse.json(theses);
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};
