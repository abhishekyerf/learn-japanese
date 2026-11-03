import Hero from "@/components/Hero";
import ModuleList from "@/components/ModuleList";
export default function Home() {
  return (<div className="space-y-8">
    <header className="pt-4"><h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Learn Japanese<br /><span className="muted">from absolute zero.</span></h1>
      <p className="muted mt-3 text-lg">Made for English speakers. Read the alphabets first, then numbers, phrases and words — one small step at a time.</p></header>
    <Hero />
    <section><h2 className="text-xl font-semibold mb-3">Your path</h2><ModuleList /></section>
    <section className="card p-6 text-sm muted space-y-2"><b className="text-[var(--fg)]">How to study</b>
      <p>1. Open a step and flip through the flashcards (tap 🔊 to hear it). 2. Take the quiz — aim for 80%+. 3. Move to the next step. Come back daily and use Practice to review.</p></section>
  </div>);
}
