const mode = import.meta.env.MODE;

export const BASE_PATH = mode === "production" ? import.meta.env.DIRECTUS_API_URL : "/api"
