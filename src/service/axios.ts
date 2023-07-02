import axios from "axios";
import { BASE_API_URL } from "../constants/constants";

axios.defaults.baseURL = BASE_API_URL;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("a@t#k$n");
  const authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = authorization;

  return config;
});

export default axios;
