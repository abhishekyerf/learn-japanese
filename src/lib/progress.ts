"use client";
import { useEffect, useState } from "react";
export type Progress = { best: Record<string, number>; seen: Record<string, number>; last?: string };
const KEY = "nihongo-progress-v1";
const empty: Progress = { best: {}, seen: {} };
export function load(): Progress { try { return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return empty; } }
export function save(p: Progress) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }
export function update(fn: (p: Progress) => void) { const p = load(); fn(p); save(p); }
export function useProgress() { const [p, setP] = useState<Progress | null>(null); useEffect(() => setP(load()), []); return p; }
/** module percent: half from flashcards seen, half from best quiz score */
export function pct(p: Progress, id: string, total: number) { const s = Math.min(p.seen[id] || 0, total) / total; return Math.round((s * 0.5 + ((p.best[id] || 0) / 100) * 0.5) * 100); }
export function speak(text: string) { if (typeof window === "undefined" || !("speechSynthesis" in window)) return false; const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; u.rate = 0.85; const v = speechSynthesis.getVoices().find((x) => x.lang.startsWith("ja")); if (v) u.voice = v; speechSynthesis.cancel(); speechSynthesis.speak(u); return true; }
