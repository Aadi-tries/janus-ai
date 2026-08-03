import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeMessageInput } from "@/lib/validation";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: decisionId } = await context.params;
    const body = await request.json();
    const normalizedMessage = normalizeMessageInput(body);

    if (!normalizedMessage) {
      return NextResponse.json({ error: "Valid role and content are required" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: {
        decisionId,
        role: normalizedMessage.role,
        content: normalizedMessage.content,
        persona: normalizedMessage.persona,
        type: normalizedMessage.type,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Failed to save message:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}
