
"use client"

import { useState } from "react"

import Link from "next/link"

import { useRouter } from "next/navigation"

import { motion } from "framer-motion"

import {
  Eye,
  EyeOff,
  Scale,
} from "lucide-react"

import { FcGoogle } from "react-icons/fc"

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

import { auth } from "@/lib/firebase"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"

export default function SignupPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [confirmPassword,
  setConfirmPassword] =
    useState("")

  const [showPassword,
  setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const [success, setSuccess] =
    useState("")

  // ────────────────────────────────────────
  // Signup
  // ────────────────────────────────────────

  const handleSignup = async () => {

    try {

      setLoading(true)

      setError("")

      if (
        password !== confirmPassword
      ) {

        setError(
          "Passwords do not match"
        )

        return
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

      await sendEmailVerification(
        userCredential.user
      )

      setSuccess(
        "Verification email sent. Please verify your email."
      )

      setTimeout(() => {

        router.push("/login")

      }, 3000)

    } catch (err) {

      console.error(err)

      setError("Signup failed")

    } finally {

      setLoading(false)
    }
  }

  // ────────────────────────────────────────
  // Google Signup
  // ────────────────────────────────────────

  const handleGoogleSignup =
    async () => {

      try {

        const provider =
          new GoogleAuthProvider()

        await signInWithPopup(
          auth,
          provider
        )

        router.push("/chat")

      } catch (error) {

        console.error(error)

        setError(
          "Google signup failed"
        )
      }
    }

  return (

    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6">

      {/* Glow Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-violet-600 rounded-full blur-[140px] opacity-30 animate-float" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-cyan-500 rounded-full blur-[140px] opacity-30 animate-float" />

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

            {/* Password */}

            <div className="relative">

              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="Password"

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

            {/* Confirm Password */}

            <Input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              placeholder="Confirm Password"

              value={confirmPassword}

              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }

              className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
            />

            {/* Error */}

            {
              error && (

                <div className="text-red-400 text-sm">

                  {error}

                </div>
              )
            }

            {/* Success */}

            {
              success && (

                <div className="text-green-400 text-sm">

                  {success}

                </div>
              )
            }

            {/* Signup */}

            <Button
              onClick={handleSignup}

              disabled={loading}

              className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 text-base font-semibold"
            >

              {
                loading
                  ? "Creating..."
                  : "Create Account"
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

            {/* Google */}

            <Button
              variant="outline"

              onClick={handleGoogleSignup}

              className="w-full h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white"
            >

              <FcGoogle className="mr-3 text-2xl" />

              Continue with Google

            </Button>

            {/* Footer */}

            <div className="text-center text-sm text-zinc-400 pt-2">

              Already have an account?

              <Link
                href="/login"

                className="text-white ml-2 hover:text-violet-400"
              >

                Sign in

              </Link>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  )
}

