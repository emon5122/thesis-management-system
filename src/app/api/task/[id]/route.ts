import { prisma } from "@/lib/prisma";
import { taskdetails } from "@/schema/task";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role === "STUDENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const tasks = await prisma.task.findMany({
      where: {
        thesis: { studentId: params.id },
      },
    });
    return NextResponse.json(tasks);
  } catch (e) {
    console.log(e);
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
  const validatedBody = taskdetails.parse(body);

  try {
    const task = await prisma.task.create({
      data: { ...validatedBody, thesis: { connect: { studentId: params.id } } },
    });
    return NextResponse.json(task);
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};
