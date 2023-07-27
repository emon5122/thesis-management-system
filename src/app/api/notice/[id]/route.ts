import { prisma } from "@/lib/prisma";
import { noticedetails } from "@/schema/notice";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: ParamsType) => {
  const token = await getToken({ req });
  if (!token || !token?.sub || token?.role === "STUDENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const notices = await prisma.notice.findMany({
      where: {
       studentId:params.id,
       
      },
      select:{
        teacher:{select:{
          name:true,
        }},
        details:true,
        createdAt:true,
      }
    });
    return NextResponse.json(notices);
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
  const validatedBody = noticedetails.parse(body);

  try {
    const notice = await prisma.notice.create({
      data:{
        details: validatedBody.details,
        studentId: params.id,
        teacherId:token.sub,
      }
    });
    return NextResponse.json(notice);
  } catch (e) {
    return NextResponse.json(e);
  } finally {
    await prisma.$disconnect();
  }
};
