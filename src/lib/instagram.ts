export type InstagramPreview = {
  url: string;
  image: string | null;
  caption: string | null;
  isReel: boolean;
};

function decodeMeta(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMeta(html: string, property: string) {
  const match = html.match(
    new RegExp(`property="${property}" content="([^"]+)"`, "i"),
  );
  return match?.[1] ? decodeMeta(match[1]) : null;
}

export async function fetchInstagramPreview(url: string): Promise<InstagramPreview> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; EdenWebsite/1.0; +https://edenkg.rs)",
        Accept: "text/html",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return { url, image: null, caption: null, isReel: url.includes("/reel/") };
    }

    const html = await response.text();

    return {
      url,
      image: extractMeta(html, "og:image"),
      caption: extractMeta(html, "og:description"),
      isReel: url.includes("/reel/"),
    };
  } catch {
    return { url, image: null, caption: null, isReel: url.includes("/reel/") };
  }
}

export async function fetchInstagramPreviews(urls: readonly string[]) {
  return Promise.all(urls.map((url) => fetchInstagramPreview(url)));
}
