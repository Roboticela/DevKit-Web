export const siteConfig = {
  name: "{{SITE_NAME}}",
  url: "{{SITE_URL}}",
  description: "{{SITE_DESCRIPTION}}",
} as const;

export function pageMeta(title?: string) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  return {
    title: fullTitle,
    description: siteConfig.description,
    canonical: siteConfig.url,
    og: { title: fullTitle, description: siteConfig.description, url: siteConfig.url },
  };
}

export function jsonLdOrganization() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  });
}
