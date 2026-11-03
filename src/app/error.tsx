"use client";
export default function Error({ reset }: { reset: () => void }) { return (<div className="card p-10 text-center"><h1 className="text-2xl font-bold">Something went wrong</h1><p className="muted">すみません — sorry!</p><button className="btn btn-primary mt-5" onClick={reset}>Try again</button></div>); }
