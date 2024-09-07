"use server";

import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const token = cookieStore.get("session")?.value;

    if (token) {
      console.log(token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const fetcher = async (url: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await api.get(url);

  console.log(response.data);
  return response.data;
};

export default api;
