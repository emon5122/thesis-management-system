import { evaluatorsList } from "./../../../schema/thesis/adminThesis";
import { prisma } from "@/lib/prisma";
import { thesisBody } from "@/schema/thesis/adminThesis";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { ParamsType } from "@/types/api";

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const validatedData = thesisBody.parse(body);
  try {
    const thesis = await prisma.thesis.create({
      data: validatedData,
    });
    return NextResponse.json(thesis, { status: 201 });
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
        evaluation: true,
      },
    });
    const teacherCount = evaluatorCount.reduce(
      (count, thesis) => count + thesis.evaluation.length,
      0
    );
    console.log(teacherCount)
    return NextResponse.json({
      teacherCount,
    });
  } catch (e) {
    return NextResponse.json(e, {status:500});
  } finally {
    await prisma.$disconnect();
  }
};
