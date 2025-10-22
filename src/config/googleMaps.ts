export const GOOGLE_MAPS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  libraries: ["places", "geometry"] as const,
  region: "BR",
  language: "pt-BR",
};
