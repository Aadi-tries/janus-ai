import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: decisionId } = await context.params;
    const body = await request.json();
    const { role, content, persona, type } = body;

    const message = await prisma.message.create({
      data: {
        decisionId,
        role,
        content,
        persona,
        type,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Failed to save message:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
