import { Link } from "react-router-dom";
import { siteConfig } from "@/lib/site";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
      <p className="text-sm text-text-secondary">Roboticela DevKit</p>
      <h1 className="mt-2 text-4xl font-semibold">{siteConfig.name}</h1>
      <p className="mt-4 text-lg text-text-secondary">{siteConfig.description}</p>
      <Link to="/dashboard" className="mt-8 inline-flex h-11 w-fit items-center rounded-full bg-brand-primary px-6 text-sm font-medium text-white">
        Open dashboard
      </Link>
      {/* Components: import { Button } from '@roboticela/devkit' */}
    </main>
  );
}
