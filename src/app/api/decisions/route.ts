import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeOptionalText, normalizeRequiredText, normalizeSelectedAgents } from "@/lib/validation";

export async function GET() {
  try {
    const decisions = await prisma.decision.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(decisions);
  } catch (error) {
    console.error("Failed to fetch decisions:", error);
    return NextResponse.json({ error: "Failed to fetch decisions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const objective = normalizeRequiredText(body.objective);
    const context = normalizeOptionalText(body.context);
    const selectedAgents = normalizeSelectedAgents(body.selectedAgents);

    if (!objective) {
      return NextResponse.json({ error: "Objective is required" }, { status: 400 });
    }

    const decision = await prisma.decision.create({
      data: {
        objective,
        context,
        selectedAgents: selectedAgents ? selectedAgents.join(",") : null,
        status: "in_progress",
      },
    });

    return NextResponse.json(decision);
  } catch (error) {
    console.error("Failed to create decision:", error);
    return NextResponse.json({ error: "Failed to create decision" }, { status: 500 });
  }
}
