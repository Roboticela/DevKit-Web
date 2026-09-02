export const siteConfig = {
  name: "{{SITE_NAME}}",
  url: "{{SITE_URL}}",
  description: "{{SITE_DESCRIPTION}}",
} as const;

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}
