import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-sm text-[var(--text-secondary)]">Roboticela DevKit</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <p className="mt-4 text-lg text-[var(--text-secondary)]">{siteConfig.description}</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center rounded-full bg-[var(--brand-primary)] px-6 text-sm font-medium text-white"
        >
          Open dashboard
        </Link>
      </div>
      {/* Components: import { Button } from '@roboticela/devkit' */}
    </main>
  );
}
