export function isHttpUrl(url: string | undefined | null): url is string {
  if (!url) return false;
  return url.startsWith("https://") || url.startsWith("http://");
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ticoblockchain.cr";
