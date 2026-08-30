import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IslamicSleeps — Bedtime Stories",
    short_name: "IslamicSleeps",
    description:
      "Islamic bedtime stories, duas, and a story generator for Muslim children — with read-aloud and the big WHY questions answered.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#5b4a8a",
    orientation: "portrait",
    categories: ["education", "kids", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
