import { db } from "@/lib/db";
import { ensureSchema } from "@/lib/schema";

export async function GET(req: Request) {
  await ensureSchema();
  const projectId = new URL(req.url).searchParams.get("projectId");
  const { rows } = await db.execute({ sql: "SELECT * FROM tasks WHERE project_id=? ORDER BY created_at DESC", args: [projectId ?? ""] });
  return Response.json(rows);
}

export async function POST(req: Request) {
  await ensureSchema();
  const b = await req.json();
  if (!b.title?.trim() || !b.projectId) return Response.json({ error: "Title and project are required" }, { status: 400 });
  const result = await db.execute({ sql: "INSERT INTO tasks (project_id,title,description,priority,status,assignee) VALUES (?,?,?,?,?,?)", args: [b.projectId, b.title.trim(), b.description?.trim() ?? "", b.priority ?? "medium", b.status ?? "todo", b.assignee ?? "ME"] });
  const { rows } = await db.execute({ sql: "SELECT * FROM tasks WHERE id=?", args: [result.lastInsertRowid!] });
  return Response.json(rows[0], { status: 201 });
}
