import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ParamsType } from "@/types/api";

export const GET = async(req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role === "STUDENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const theses = await prisma.thesis.findFirst({
        where: {
            supervisorId:token?.sub,
            studentId: params.id,
           },
      select:{
        supervisorId:true
      }
    });
    return NextResponse.json(theses);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
};