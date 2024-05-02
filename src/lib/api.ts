import axios from "axios";

const apiToken = process.env.DIRECTUS_API_KEY;

axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const api = axios.create({
  baseURL: "",
});

export default api;
