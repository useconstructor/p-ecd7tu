import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = { title: "Flowboard — Projects in motion", description: "A focused project and task management workspace for teams and solo creators." };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><SiteNav />{children}<footer className="border-t border-line bg-soft px-6 py-10"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><strong className="text-sm">Flowboard</strong><p className="mt-1 text-xs text-slate">Clear work. Steady progress.</p></div><div className="flex gap-6 text-xs text-slate"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div><p className="text-xs text-slate">© {new Date().getFullYear()} Flowboard</p></div></footer></body>
    </html>
  );
}
