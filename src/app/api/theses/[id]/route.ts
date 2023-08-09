import { prisma } from "@/lib/prisma";
import { taskdetails } from "@/schema/task";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const PATCH = async (req: NextRequest, { params }: ParamsType) => {
    const token = await getToken({ req });
    if (!token || !token?.sub || token?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const validatedBody = z.object({ date: z.string().datetime() }).parse(body);
  
    try {
      const date = await prisma.thesis.update({
        where: { id: params.id },
        data: {endedAt:validatedBody.date}
      });
      return NextResponse.json(date);
    } catch (e) {
      return NextResponse.json(e, {status:500});
    } finally {
      await prisma.$disconnect();
    }
  };