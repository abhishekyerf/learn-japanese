"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MODULES, type Module } from "@/lib/data";
import { speak, update } from "@/lib/progress";
import Quiz from "./Quiz";
export default function Lesson({ m }: { m: Module }) {
  const [tab, setTab] = useState<"cards" | "chart" | "quiz">("cards");
  const [i, setI] = useState(0); const [flip, setFlip] = useState(false); const [saved, setSaved] = useState<number | null>(null);
  useEffect(() => { update((p) => { p.last = m.id; }); }, [m.id]);
  useEffect(() => { update((p) => { p.seen[m.id] = Math.max(p.seen[m.id] || 0, i + 1); }); }, [i, m.id]);
  const it = m.items[i]; const idx = MODULES.findIndex((x) => x.id === m.id); const nextM = MODULES[idx + 1];
  return (<div className="space-y-6">
    <div><Link href="/learn" className="text-sm muted">← Curriculum</Link>
      <h1 className="text-3xl font-bold tracking-tight mt-2">{m.emoji} {m.title} <span className="muted font-normal" lang="ja">{m.jpTitle}</span></h1>
      <p className="muted mt-1">{m.blurb}</p></div>
    <div className="flex gap-1 p-1 rounded-full bg-[var(--line)] w-fit">{(["cards", "chart", "quiz"] as const).map((t) => (
      <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${tab === t ? "bg-[var(--card)] shadow" : "muted"}`}>{t === "cards" ? "Flashcards" : t === "chart" ? (m.kana ? "Chart" : "List") : "Quiz"}</button>))}</div>
    {tab === "cards" && (<div>
      <button onClick={() => setFlip(!flip)} className="card w-full p-8 min-h-72 flex flex-col items-center justify-center text-center">
        <div className={`${it.jp.length > 4 ? "text-4xl" : "text-8xl"} font-medium break-words max-w-full`} lang="ja">{it.jp}</div>
        {flip ? (<div className="mt-5"><div className="text-2xl font-semibold">{it.romaji}</div>{!m.kana && <div className="muted mt-1">{it.en}</div>}
          {it.note && <div className="muted mt-2 text-sm" lang="ja">e.g. {it.note}</div>}</div>) : <div className="muted text-sm mt-5">Tap to reveal</div>}
      </button>
      <div className="flex items-center justify-between mt-4 gap-2">
        <button className="btn btn-ghost" disabled={i === 0} onClick={() => { setI(i - 1); setFlip(false); }}>←</button>
        <button className="btn btn-ghost" onClick={() => speak(it.jp)}>🔊 Listen</button>
        <span className="text-sm muted tabular-nums">{i + 1}/{m.items.length}</span>
        {i < m.items.length - 1 ? <button className="btn btn-primary" onClick={() => { setI(i + 1); setFlip(false); }}>→</button>
          : <button className="btn btn-primary" onClick={() => setTab("quiz")}>Quiz</button>}
      </div></div>)}
    {tab === "chart" && (<div className={m.kana ? "grid grid-cols-5 gap-2" : "grid gap-2"}>{m.items.map((x, k) => m.kana ? (
      <button key={k} onClick={() => speak(x.jp)} className="card py-3 text-center"><div className="text-3xl" lang="ja">{x.jp}</div><div className="text-xs muted mt-1">{x.romaji}</div></button>) : (
      <button key={k} onClick={() => speak(x.jp)} className="card p-4 flex justify-between items-center text-left gap-3"><div className="min-w-0"><div className="text-xl" lang="ja">{x.jp}</div><div className="text-sm muted">{x.romaji}</div></div><div className="text-right text-sm">{x.en}</div></button>))}</div>)}
    {tab === "quiz" && (<div className="space-y-4">
      <Quiz items={m.items} kana={m.kana} onDone={(s) => { update((p) => { p.best[m.id] = Math.max(p.best[m.id] || 0, s); }); setSaved(s); }} />
      {saved !== null && nextM && <Link href={`/learn/${nextM.id}`} className="card p-5 block font-semibold">Next step: {nextM.emoji} {nextM.title} →</Link>}
    </div>)}
  </div>);
}
