import { prisma } from "@/lib/prisma";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role === "STUDENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const attendances = await prisma.attendance.findMany({
      where: {
        studentId: params.id,
      },
      select: { id: true, weekNumber: true, createdAt: true, comments: true },
    });
    return NextResponse.json(attendances);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "TEACHER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const validatedBody = z
    .object({
      weekNumber: z.number(),
      comments: z.string(),
    })
    .parse(body);

  try {
    const attendance = await prisma.attendance.create({
      data: {
        weekNumber: validatedBody.weekNumber,
        comments: validatedBody.comments,
        studentId: params.id,
      },
    });
    return NextResponse.json(attendance);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
};
