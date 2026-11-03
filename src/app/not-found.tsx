import Link from "next/link";
export default function NotFound() { return (<div className="card p-10 text-center"><div className="text-6xl" lang="ja">？</div><h1 className="text-2xl font-bold mt-3">Page not found</h1><p className="muted">みつかりません — mitsukarimasen (not found)</p><Link href="/" className="btn btn-primary inline-block mt-5">Go home</Link></div>); }
