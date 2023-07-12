import { prisma } from "@/lib/prisma";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req: any,{ params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role === "STUDENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const attendances = await prisma.attendance.findMany({
      where: {
        studentId:params.id,
      },
    });
    return NextResponse.json(attendances);
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};
