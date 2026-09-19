import { db } from "@/lib/db";

export async function ensureSchema() {
  await db.batch([
    `CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', created_at TEXT DEFAULT (datetime('now')))`,
    `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, project_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '', priority TEXT NOT NULL DEFAULT 'medium', status TEXT NOT NULL DEFAULT 'todo', assignee TEXT NOT NULL DEFAULT 'ME', created_at TEXT DEFAULT (datetime('now')), updated_at TEXT DEFAULT (datetime('now')), FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE)`,
  ]);
  const count = await db.execute("SELECT COUNT(*) AS count FROM projects");
  if (Number(count.rows[0].count) === 0) {
    await db.batch([
      { sql: "INSERT INTO projects (name, description) VALUES (?, ?)", args: ["Website Redesign", "Refresh the marketing site and improve conversion across the core journey."] },
      { sql: "INSERT INTO projects (name, description) VALUES (?, ?)", args: ["Mobile App Launch", "Coordinate the product, content, and release work for the mobile launch."] },
      { sql: "INSERT INTO projects (name, description) VALUES (?, ?)", args: ["Customer Feedback Portal", "Turn customer signals into a clear, prioritized product feedback loop."] },
    ]);
    await db.batch([
      { sql: "INSERT INTO tasks (project_id,title,description,priority,status,assignee) VALUES (1,?,?,?,?,?)", args: ["Write copy for hero section", "Draft and review the primary value proposition.", "medium", "todo", "SC"] },
      { sql: "INSERT INTO tasks (project_id,title,description,priority,status,assignee) VALUES (1,?,?,?,?,?)", args: ["Conduct user interviews", "Speak with five active customers about the new navigation.", "high", "todo", "MW"] },
      { sql: "INSERT INTO tasks (project_id,title,description,priority,status,assignee) VALUES (1,?,?,?,?,?)", args: ["Design landing page", "Complete responsive layouts and interaction states.", "high", "in-progress", "AR"] },
      { sql: "INSERT INTO tasks (project_id,title,description,priority,status,assignee) VALUES (1,?,?,?,?,?)", args: ["Review design mockups", "Collect stakeholder feedback and resolve open notes.", "medium", "in-progress", "SC"] },
      { sql: "INSERT INTO tasks (project_id,title,description,priority,status,assignee) VALUES (1,?,?,?,?,?)", args: ["Set up analytics tracking", "Validate conversion events in the production environment.", "low", "done", "JL"] },
    ]);
  }
}
