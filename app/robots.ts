import { site } from "@/constants/personal";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow everything for standard search crawlers.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicit welcome for AI training / retrieval crawlers.
      // (Set to `disallow: '/'` if you want to opt out of AI training.)
      { userAgent: "GPTBot",           allow: "/" },
      { userAgent: "OAI-SearchBot",    allow: "/" },
      { userAgent: "ChatGPT-User",     allow: "/" },
      { userAgent: "ClaudeBot",        allow: "/" },
      { userAgent: "Claude-Web",       allow: "/" },
      { userAgent: "anthropic-ai",     allow: "/" },
      { userAgent: "PerplexityBot",    allow: "/" },
      { userAgent: "Perplexity-User",  allow: "/" },
      { userAgent: "Google-Extended",  allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot",            allow: "/" },
      { userAgent: "Amazonbot",        allow: "/" },
      { userAgent: "cohere-ai",        allow: "/" },
      { userAgent: "Bytespider",       allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
