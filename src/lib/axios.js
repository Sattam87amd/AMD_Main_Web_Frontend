import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_MODE === "development"
    ? "http://localhost:5071/api"
    : "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
