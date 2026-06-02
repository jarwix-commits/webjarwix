import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("jarwix_session")?.value;

    if (token) {
      await prisma.session.deleteMany({ where: { token } });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.delete("jarwix_session");
    return res;
  } catch (err) {
    console.error("[auth/logout POST]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
