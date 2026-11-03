import { notFound } from "next/navigation";
import Lesson from "@/components/Lesson";
import { MODULES, getModule } from "@/lib/data";
export function generateStaticParams() { return MODULES.map((m) => ({ id: m.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) { const m = getModule((await params).id); return { title: m ? `${m.title} — Nihongo` : "Not found" }; }
export default async function Page({ params }: { params: Promise<{ id: string }> }) { const m = getModule((await params).id); if (!m) notFound(); return <Lesson m={m} />; }
