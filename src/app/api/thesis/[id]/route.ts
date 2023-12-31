import { prisma } from "@/lib/prisma";
import { teachersBody } from "@/schema/thesis/adminThesis";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const validatedData = teachersBody.parse(body);
  try {
    validatedData.map(async (id) => {
      await prisma.thesis.update({
        where: { id: params.id },
        data: {
          teacher: { connect: { id } },
        },
      });
    });
    return NextResponse.json({ details: "successful" }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
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
        teacher: true,
      },
    });
    const teacherCount = evaluatorCount.reduce(
      (count, thesis) => count + thesis.teacher.length,
      0
    );

    return NextResponse.json({
      teacherCount,
    });

  } catch (e) {
    return NextResponse.json(e, {status:500});
  } finally {
    await prisma.$disconnect();
  }
};
