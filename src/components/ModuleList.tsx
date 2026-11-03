"use client";
import Link from "next/link";
import { MODULES } from "@/lib/data";
import { pct, useProgress } from "@/lib/progress";
export default function ModuleList() {
  const p = useProgress();
  return (<div className="grid gap-3">{MODULES.map((m, i) => { const v = p ? pct(p, m.id, m.items.length) : 0; return (
    <Link key={m.id} href={`/learn/${m.id}`} className="card p-5 flex items-center gap-4 hover:scale-[1.01] transition">
      <div className="text-3xl w-12 text-center">{m.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs muted">Step {i + 1}</div>
        <div className="font-semibold">{m.title} <span className="muted font-normal">{m.jpTitle}</span></div>
        <div className="text-sm muted truncate">{m.blurb}</div>
        <div className="bar mt-2"><i style={{ width: `${v}%` }} /></div>
      </div>
      <div className="text-sm font-semibold tabular-nums w-10 text-right">{p ? `${v}%` : ""}</div>
    </Link>); })}</div>);
}
