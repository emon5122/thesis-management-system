import { prisma } from "@/lib/prisma";
import { teachersBody } from "@/schema/thesis/adminThesis";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: ParamsType) => {
  console.log(params)
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const validatedData = teachersBody.parse(body);
  try {
    const teachers = await prisma.thesis.findMany({
      where: {
        id: params.id,
      },
      select: {
        teacher: true,
      },
    });
    const updatedThesis = await prisma.thesis.update({
      where: {
        id: params.id,
      },
      data: {
        teacher: validatedData,
      },
    });
    return NextResponse.json(teachers, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
