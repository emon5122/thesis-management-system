import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.error();
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: token?.email as string,
      },
    });
    return NextResponse.json(user?.role);
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
};
