import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = { title: "Nihongo — Learn Japanese from zero", description: "A free beginner path for English speakers: Hiragana, Katakana, numbers, phrases and vocab." };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000" }, { color: "#f5f5f7" }] };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-dvh">
    <nav className="sticky top-0 z-20 backdrop-blur-xl bg-[color-mix(in_srgb,var(--bg)_75%,transparent)] border-b border-[var(--line)]">
      <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">にほんご <span className="muted font-normal">Nihongo</span></Link>
        <div className="flex gap-5 text-sm"><Link href="/learn">Learn</Link><Link href="/practice">Practice</Link></div>
      </div></nav>
    <main className="max-w-3xl mx-auto px-5 py-8 pb-24">{children}</main>
    <footer className="text-center text-xs muted pb-10">Original lesson content · MIT licensed · Progress saved on this device</footer>
  </body></html>);
}
