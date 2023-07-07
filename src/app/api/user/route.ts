import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/server";

export const POST = async (req: Request) => {
  try {
    const { account, email, signedToken } = await req.json();

    const user = await prisma.user.upsert({
      where: { account },
      update: { signedToken },
      create: {
        account,
        email,
        signedToken,
      },
      // select는 값을 가져오지않는
      select: {
        account: true,
        email: true,
        nickname: true,
        signedToken: true,
      },
    });

    return NextResponse.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

// 필요하면 const GET 등등 달아주면됨
