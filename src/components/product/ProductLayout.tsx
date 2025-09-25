import { ReactNode } from "react";

interface ProductLayoutProps {
  gallery: ReactNode;
  summary: ReactNode;
  children?: ReactNode;
}

export default function ProductLayout({ gallery, summary, children }: ProductLayoutProps) {
  return (
    <div className="min-h-screen bg-cream-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">{gallery}</div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">{summary}</div>
          </div>
        </div>

        {children && (
          <div className="mt-14 space-y-14">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}


