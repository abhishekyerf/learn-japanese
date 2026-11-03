"use client";
import { useEffect, useState } from "react";
import type { Item } from "@/lib/data";
import { speak } from "@/lib/progress";
type Mode = "choice" | "reverse" | "type";
type Q = { item: Item; mode: Mode; options: string[] };
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "").replace(/ō/g, "ou");
export default function Quiz({ items, kana, modes = ["choice", "reverse", "type"], count = 10, onDone }: { items: Item[]; kana?: boolean; modes?: Mode[]; count?: number; onDone?: (score: number) => void }) {
  const [seed, setSeed] = useState(0);
  const [qs, setQs] = useState<Q[] | null>(null);
  useEffect(() => { setQs(shuffle(items).slice(0, Math.min(count, items.length)).map((item, i) => {
    const mode = modes[i % modes.length];
    const pool = shuffle(items.filter((x) => x !== item)).slice(0, 3);
    const label = (x: Item) => (mode === "reverse" ? x.jp : kana ? x.romaji : x.en);
    return { item, mode, options: shuffle([item, ...pool]).map(label) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })); }, [items, seed]);
  const [i, setI] = useState(0); const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null); const [typed, setTyped] = useState("");
  if (!items.length) return <div className="card p-6 muted">No items to practice yet.</div>;
  if (!qs) return <div className="skel h-80" />;
  if (i >= qs.length) { const pc = Math.round((score / qs.length) * 100); return (
    <div className="card p-8 text-center"><div className="text-6xl">{pc >= 80 ? "🎉" : "💪"}</div>
      <div className="text-3xl font-bold mt-3">{score} / {qs.length}</div>
      <p className="muted mt-1">{pc >= 80 ? "すごい! Great job — you're ready for the next step." : "Keep going — review the cards and try again."}</p>
      <button className="btn btn-primary mt-5" onClick={() => { setI(0); setScore(0); setPicked(null); setTyped(""); setSeed(seed + 1); }}>Try again</button></div>); }
  const q = qs[i];
  const answer = q.mode === "reverse" ? q.item.jp : q.mode === "type" ? q.item.romaji : kana ? q.item.romaji : q.item.en;
  const correct = picked !== null && (q.mode === "type" ? norm(picked) === norm(q.item.romaji) : picked === answer);
  const submit = (v: string) => { if (picked !== null) return; setPicked(v); const ok = q.mode === "type" ? norm(v) === norm(q.item.romaji) : v === answer; if (ok) setScore(score + 1); };
  const next = () => { const last = i + 1 >= qs.length; const fin = score; setPicked(null); setTyped(""); setI(i + 1); if (last) onDone?.(Math.round((fin / qs.length) * 100)); };
  return (<div className="card p-6">
    <div className="flex justify-between text-sm muted"><span>Question {i + 1} of {qs.length}</span><span>Score {score}</span></div>
    <div className="bar mt-2"><i style={{ width: `${(i / qs.length) * 100}%` }} /></div>
    <div className="text-center my-8">
      <div className="text-sm muted mb-2">{q.mode === "reverse" ? `Which is “${kana ? q.item.romaji : q.item.en}”?` : q.mode === "type" ? "Type the romaji" : kana ? "What sound is this?" : "What does this mean?"}</div>
      {q.mode !== "reverse" && <div className={`${q.item.jp.length > 4 ? "text-4xl" : "text-7xl"} font-medium break-words`} lang="ja">{q.item.jp}</div>}
      {q.mode !== "reverse" && <button aria-label="Speak" className="mt-3 text-sm muted" onClick={() => speak(q.item.jp)}>🔊 Listen</button>}
    </div>
    {q.mode === "type" ? (
      <form onSubmit={(e) => { e.preventDefault(); if (picked === null) { if (typed.trim()) submit(typed); } else next(); }} className="flex gap-2">
        <input autoFocus value={typed} onChange={(e) => setTyped(e.target.value)} disabled={picked !== null} autoCapitalize="none" autoCorrect="off" placeholder="e.g. ka" className="flex-1 min-w-0 rounded-full px-4 py-3 bg-[var(--line)] outline-none text-lg" />
        <button className="btn btn-primary">{picked === null ? "Check" : "Next"}</button></form>
    ) : (<div className="grid grid-cols-2 gap-3">{q.options.map((o) => { const st = picked === null ? "" : o === answer ? "!bg-green-500 !text-white" : o === picked ? "!bg-red-500 !text-white" : "opacity-50";
      return <button key={o} lang={q.mode === "reverse" ? "ja" : undefined} onClick={() => submit(o)} className={`btn btn-ghost py-4 ${q.mode === "reverse" ? "text-2xl" : "text-base"} ${st}`}>{o}</button>; })}</div>)}
    {picked !== null && (<div className="mt-5 flex items-center justify-between gap-3">
      <div className={correct ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>{correct ? "Correct! ✓" : <>Answer: <span lang="ja">{q.item.jp}</span> = {q.item.romaji}{kana ? "" : ` (${q.item.en})`}</>}</div>
      {q.mode !== "type" && <button className="btn btn-primary" onClick={next}>Next</button>}</div>)}
  </div>);
}
