import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  // check user email on server because hacker could edit code/form and pass something else in client side
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;

  const data = await req.json();
  data.age = Number(data.age);

  // ideally do some server-side data validation in production app before updating user in db
  const user = await prisma.user.update({
    where: {
      email: currentUserEmail,
    },
    data,
  });

  return NextResponse.json(user);
}
