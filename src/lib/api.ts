import axios from "axios";

const apiToken = process.env.DIRECTUS_API_KEY;

axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = process.env.API_BASE_PATH;

const mode = process.env.NODE_ENV;

let apiBasePath = "/api";

if (mode === "production") {
  apiBasePath = process.env.API_BASE_PATH as string;
}

const api = axios.create({
  baseURL: apiBasePath,
  withCredentials: true
});

export default api;
