import { db } from "@/lib/db";
import { ensureSchema } from "@/lib/schema";

export async function GET() {
  await ensureSchema();
  const { rows } = await db.execute(`SELECT p.*, COUNT(t.id) AS task_count FROM projects p LEFT JOIN tasks t ON t.project_id=p.id GROUP BY p.id ORDER BY p.created_at ASC`);
  return Response.json(rows);
}

export async function POST(req: Request) {
  await ensureSchema();
  const { name, description } = await req.json();
  if (!name?.trim()) return Response.json({ error: "Project name is required" }, { status: 400 });
  const result = await db.execute({ sql: "INSERT INTO projects (name, description) VALUES (?, ?)", args: [name.trim(), description?.trim() ?? ""] });
  const { rows } = await db.execute({ sql: "SELECT *, 0 AS task_count FROM projects WHERE id=?", args: [result.lastInsertRowid!] });
  return Response.json(rows[0], { status: 201 });
}
