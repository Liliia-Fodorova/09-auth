import axios from "axios";

export const nextServer = axios.create({
  baseURL: `/api`,
  withCredentials: true,
});

// const key = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// nextServer.defaults.headers.common["Authorization"] = `Bearer ${key}`;