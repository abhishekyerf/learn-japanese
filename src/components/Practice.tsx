"use client";
import { useState } from "react";
import { MODULES } from "@/lib/data";
import Quiz from "./Quiz";
export default function Practice() {
  const [id, setId] = useState("hiragana"); const [mode, setMode] = useState<"choice" | "type">("choice");
  const m = MODULES.find((x) => x.id === id)!;
  return (<div className="space-y-5">
    <div className="flex flex-wrap gap-2">{MODULES.map((x) => <button key={x.id} onClick={() => setId(x.id)} className={`btn text-sm !py-2 ${id === x.id ? "btn-primary" : "btn-ghost"}`}>{x.title}</button>)}</div>
    <div className="flex gap-2"><button onClick={() => setMode("choice")} className={`btn text-sm !py-2 ${mode === "choice" ? "btn-primary" : "btn-ghost"}`}>Multiple choice</button>
      <button onClick={() => setMode("type")} className={`btn text-sm !py-2 ${mode === "type" ? "btn-primary" : "btn-ghost"}`}>Type romaji</button></div>
    <Quiz key={id + mode} items={m.items} kana={m.kana} modes={mode === "choice" ? ["choice", "reverse"] : ["type"]} count={15} />
  </div>);
}
