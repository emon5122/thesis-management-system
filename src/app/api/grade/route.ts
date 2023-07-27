import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const theses = await prisma.thesis.findMany({
        where: {
            supervisorId:token?.sub,
           },
      select: {
        
        supervisorId: true,
    
      },
    });
    return NextResponse.json(theses);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
};
