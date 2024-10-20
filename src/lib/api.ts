import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const api = axios.create({
  baseURL: "",
  withCredentials: true
});

export default api;
