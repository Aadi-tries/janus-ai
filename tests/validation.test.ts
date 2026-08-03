import test from "node:test";
import assert from "node:assert/strict";
import {
  isDecisionStatus,
  normalizeHistory,
  normalizeMessageInput,
  normalizeOptionalText,
  normalizeRequiredText,
  normalizeSelectedAgents,
} from "../src/lib/validation.ts";

test("normalizes required and optional text fields", () => {
  assert.equal(normalizeRequiredText("  launch beta  "), "launch beta");
  assert.equal(normalizeRequiredText("   "), null);
  assert.equal(normalizeRequiredText(42), null);
  assert.equal(normalizeOptionalText("  context  "), "context");
  assert.equal(normalizeOptionalText(null), "");
});

test("deduplicates valid selected agents and removes unknown agent ids", () => {
  assert.deepEqual(normalizeSelectedAgents(["investor", "investor", "bad", "risk_analyst"]), ["investor", "risk_analyst"]);
  assert.equal(normalizeSelectedAgents(["bad"]), null);
  assert.equal(normalizeSelectedAgents("investor"), null);
});

test("filters invalid conversation history entries", () => {
  assert.deepEqual(normalizeHistory([
    { role: "user", content: "  evidence " },
    { role: "assistant", content: "Attack", persona: "Investor", type: "question" },
    { role: "assistant", content: "   " },
    { role: "system", content: "ignore me" },
  ]), [
    { role: "user", content: "  evidence " },
    { role: "assistant", content: "Attack", persona: "Investor", type: "question" },
  ]);
});

test("validates message input and allowed decision statuses", () => {
  assert.deepEqual(normalizeMessageInput({ role: "user", content: "answer" }), { role: "user", content: "answer" });
  assert.equal(normalizeMessageInput({ role: "system", content: "answer" }), null);
  assert.equal(isDecisionStatus("completed"), true);
  assert.equal(isDecisionStatus("deleted"), false);
});
