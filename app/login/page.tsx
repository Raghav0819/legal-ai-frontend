"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import Link from "next/link"

import { motion } from "framer-motion"

import {
  Eye,
  EyeOff,
  Scale,
} from "lucide-react"

import { FcGoogle } from "react-icons/fc"

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

import { auth } from "@/lib/firebase"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [showPassword,
  setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  // ─────────────────────────────────────────
  // Email Login
  // ─────────────────────────────────────────

  const handleLogin = async () => {

    try {

      setLoading(true)

      setError("")

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

      if (
        !userCredential.user.emailVerified
      ) {

        setError(
          "Please verify your email first."
        )

        return
      }

      const token =
        await userCredential.user.getIdToken()

      localStorage.setItem(
        "token",
        token
      )

      router.push("/chat")

    } catch (err) {

      console.error(err)

      setError(
        "Invalid email or password"
      )

    } finally {

      setLoading(false)
    }
  }

  // ─────────────────────────────────────────
  // Google Sign In
  // ─────────────────────────────────────────

  const handleGoogleLogin =
    async () => {

      try {

        const provider =
          new GoogleAuthProvider()

        const result =
          await signInWithPopup(
            auth,
            provider
          )

        const token =
          await result.user.getIdToken()

        localStorage.setItem(
          "token",
          token
        )

        router.push("/chat")

      } catch (error) {

        console.error(error)

        setError(
          "Google sign in failed"
        )
      }
    }

  return (

    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-6">

      {/* Background Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-violet-600 rounded-full blur-[140px] opacity-30 animate-float" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[140px] opacity-30 animate-float" />

      </div>

      {/* Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="relative z-10 w-full max-w-md"
      >

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8">

          {/* Logo */}

          <div className="flex flex-col items-center mb-8">

            <div className="w-20 h-20 rounded-3xl bg-white text-black flex items-center justify-center shadow-lg">

              <Scale className="w-10 h-10" />

            </div>

            <h1 className="text-4xl font-bold text-white mt-5">

              Legal AI

            </h1>

            <p className="text-zinc-400 mt-2 text-center">

              AI-powered Indian Legal Assistant

            </p>

          </div>

          {/* Inputs */}

          <div className="space-y-5">

            <Input
              type="email"

              placeholder="Enter your email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }

              className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
            />

            <div className="relative">

              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="Enter your password"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-zinc-500 pr-12"
              />

              <button
                type="button"

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

                className="absolute right-4 top-4 text-zinc-400"
              >

                {
                  showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                }

              </button>

            </div>

            {/* Error */}

            {
              error && (

                <div className="text-red-400 text-sm">

                  {error}

                </div>
              )
            }

            {/* Login Button */}

            <Button
              onClick={handleLogin}

              disabled={loading}

              className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 text-base font-semibold transition-all"
            >

              {
                loading
                  ? "Signing In..."
                  : "Sign In"
              }

            </Button>

            {/* Divider */}

            <div className="flex items-center gap-3 py-2">

              <div className="flex-1 h-px bg-white/10" />

              <span className="text-zinc-500 text-sm">

                OR

              </span>

              <div className="flex-1 h-px bg-white/10" />

            </div>

            {/* Google Button */}

            <Button
              variant="outline"

              onClick={handleGoogleLogin}

              className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white text-base"
            >

              <FcGoogle className="mr-3 text-2xl" />

              Continue with Google

            </Button>

            {/* Footer */}

            <div className="text-center text-sm text-zinc-400 pt-2">

              Don&apos;t have an account?

              <Link
                href="/signup"

                className="text-white ml-2 hover:text-violet-400 transition"
              >

                Sign up

              </Link>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  )
}