import axios from "axios";

const apiToken = process.env.DIRECTUS_API_KEY;

axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "" : process.env.API_BASE_PATH,
});

export default api;
