import { db } from "@/lib/db";
import { ensureSchema } from "@/lib/schema";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureSchema();
  const { id } = await params;
  const b = await req.json();
  const allowed = ["title", "description", "priority", "status", "assignee"] as const;
  const entries = allowed.filter((key) => b[key] !== undefined).map((key) => [key, b[key]] as const);
  if (!entries.length) return Response.json({ error: "No changes supplied" }, { status: 400 });
  await db.execute({ sql: `UPDATE tasks SET ${entries.map(([key]) => `${key}=?`).join(",")}, updated_at=datetime('now') WHERE id=?`, args: [...entries.map(([, value]) => value), id] });
  const { rows } = await db.execute({ sql: "SELECT * FROM tasks WHERE id=?", args: [id] });
  return Response.json(rows[0] ?? null);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureSchema();
  const { id } = await params;
  await db.execute({ sql: "DELETE FROM tasks WHERE id=?", args: [id] });
  return Response.json({ ok: true });
}
