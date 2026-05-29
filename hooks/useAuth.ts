"use client"

import { useState } from "react"

import { api } from "@/lib/api"

export function useAuth() {

  const [loading, setLoading] = useState(false)

  const login = async (
    email: string,
    password: string
  ) => {

    try {

      setLoading(true)

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      )

      const token =
        response.data.access_token

      localStorage.setItem(
        "token",
        token
      )

      return true

    } catch (error) {

      console.error(error)

      return false

    } finally {

      setLoading(false)
    }
  }

  return {

    login,

    loading,
  }
}