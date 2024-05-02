const mode = import.meta.env.MODE;

export const BASE_PATH = mode === "production" ? import.meta.env.API_BASE_PATH : "/api"
