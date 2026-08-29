import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

// const key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// nextServer.defaults.headers.common["Authorization"] = `Bearer ${key}`;