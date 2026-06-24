import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const { success } = rateLimit(ip, { windowMs: 15 * 60 * 1000, maxRequests: 5 });

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, name, company, phoneNumber, websiteUrl, revenue, primaryGoal, biggestChallenge } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const audit = await prisma.auditRequest.create({
      data: { 
        email, 
        name: name || null, 
        company: company || null,
        phoneNumber: phoneNumber || null,
        websiteUrl: websiteUrl || null,
        revenue: revenue || null,
        primaryGoal: primaryGoal || null,
        biggestChallenge: biggestChallenge || null
      },
    });

    return NextResponse.json({ success: true, id: audit.id }, { status: 201 });
  } catch (err) {
    console.error("[audit/POST]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
