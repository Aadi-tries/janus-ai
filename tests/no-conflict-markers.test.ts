import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const IGNORED_DIRECTORIES = new Set([".git", ".next", "node_modules"]);
const CONFLICT_MARKERS = ["<".repeat(7), "=".repeat(7), ">".repeat(7)];

function collectFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      return IGNORED_DIRECTORIES.has(entry) ? [] : collectFiles(fullPath);
    }

    return stats.isFile() ? [fullPath] : [];
  });
}

test("repository does not contain unresolved merge conflict markers", () => {
  const root = process.cwd();
  const offenders = collectFiles(root).filter((file) => {
    const contents = readFileSync(file, "utf8");
    return CONFLICT_MARKERS.some((marker) => contents.includes(marker));
  });

  assert.deepEqual(offenders.map((file) => relative(root, file)), []);
});
