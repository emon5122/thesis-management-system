import { prisma } from "@/lib/prisma";
import { register } from "@/schema/registration";
import { hash } from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validatedBody = register.safeParse(body);
  if (!validatedBody.success) {
    return NextResponse.error();
  }
  const encryptedPassword = await hash(validatedBody.data.password, 10);

  try {
    await prisma.user.create({
      data: { ...validatedBody.data, password: encryptedPassword },
    });
    return NextResponse.json(
      { message: "registration successful" },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
};
