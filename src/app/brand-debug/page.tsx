"use client";

import { useEffect, useState } from "react";

export default function BrandDebugPage() {
  const [files, setFiles] = useState<{name: string; path: string}[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/brand-files')
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setFiles(d.files);
        else setError(d.error || 'Unknown error');
      })
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div className="min-h-screen bg-cream-400 p-8">
      <h1 className="text-2xl font-bold mb-4">Brand Files Debug</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <ul className="space-y-2 mb-8">
        {files.map((f) => (
          <li key={f.path} className="font-mono">{f.name} → {f.path}</li>
        ))}
      </ul>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((f) => (
          <div key={f.path} className="border rounded-lg overflow-hidden bg-white">
            <img src={f.path} alt={f.name} className="w-full h-40 object-cover" />
            <div className="p-2 text-sm font-mono">{f.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


