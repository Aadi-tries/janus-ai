import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isDecisionStatus } from "@/lib/validation";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const decision = await prisma.decision.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!decision) {
      return NextResponse.json({ error: "Decision not found" }, { status: 404 });
    }

    return NextResponse.json(decision);
  } catch (error) {
    console.error("Failed to fetch decision:", error);
    return NextResponse.json({ error: "Failed to fetch decision" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!isDecisionStatus(status)) {
      return NextResponse.json({ error: "Invalid decision status" }, { status: 400 });
    }

    const decision = await prisma.decision.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(decision);
  } catch (error) {
    console.error("Failed to update decision:", error);
    return NextResponse.json({ error: "Failed to update decision" }, { status: 500 });
  }
}
