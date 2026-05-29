import axios from "axios"

const API_BASE_URL = "https://legal-ai-backend-7tbs.onrender.com"

export const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})