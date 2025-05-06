import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_MODE === "development"
    ? "https://amd-chat.code4bharat.com"
    : "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
