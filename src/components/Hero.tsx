"use client";
import Link from "next/link";
import { MODULES, getModule } from "@/lib/data";
import { pct, useProgress } from "@/lib/progress";
export default function Hero() {
  const p = useProgress();
  if (!p) return <div className="skel h-40" />;
  const overall = Math.round(MODULES.reduce((s, m) => s + pct(p, m.id, m.items.length), 0) / MODULES.length);
  const last = p.last ? getModule(p.last) : undefined;
  return (<div className="card p-6 sm:p-8">
    <div className="text-sm muted">Your progress</div>
    <div className="text-5xl font-bold tracking-tight mt-1 tabular-nums">{overall}%</div>
    <div className="bar mt-3"><i style={{ width: `${overall}%` }} /></div>
    <div className="flex flex-wrap gap-3 mt-6">
      {last ? <Link className="btn btn-primary" href={`/learn/${last.id}`}>Continue: {last.title} →</Link>
            : <Link className="btn btn-primary" href="/learn/hiragana">Start from zero →</Link>}
      <Link className="btn btn-ghost" href="/practice">Quick practice</Link>
    </div>
  </div>);
}
