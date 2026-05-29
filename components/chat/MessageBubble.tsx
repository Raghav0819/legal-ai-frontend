"use client"

import React, {
  useState,
} from "react"

import ReactMarkdown
from "react-markdown"

import remarkGfm
from "remark-gfm"

import SyntaxHighlighter
from "react-syntax-highlighter"

import {
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs"
import {
  Copy,
  Check,
  RotateCcw,
  Scale,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

import CitationCard
from "@/components/chat/CitationCard"

import {
  Citation,
} from "@/types"

interface MessageBubbleProps {

  role:
    | "user"
    | "assistant"

  content: string

  citations?: Citation[]

  isStreaming?: boolean

  onRegenerate?: () => void
}

export default function MessageBubble({

  role,

  content,

  citations = [],

  isStreaming = false,

  onRegenerate,

}: MessageBubbleProps) {

  // ────────────────────────────────────────
  // Local State
  // ────────────────────────────────────────

  const [copied,
  setCopied] =
    useState(false)

  const [showReferences,
  setShowReferences] =
    useState(true)

  // ────────────────────────────────────────
  // Copy
  // ────────────────────────────────────────

  const handleCopy = async () => {

    try {

      await navigator.clipboard.writeText(
        content
      )

      setCopied(true)

      setTimeout(() => {

        setCopied(false)

      }, 2000)

    } catch (error) {

      console.error(error)
    }
  }

  // ────────────────────────────────────────
  // USER MESSAGE
  // ────────────────────────────────────────

  if (role === "user") {

    return (

      <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">

        <div className="max-w-3xl rounded-3xl px-6 py-5 bg-white text-black shadow-2xl border border-white">

          <p className="leading-8 whitespace-pre-wrap">

            {content}

          </p>

        </div>

      </div>
    )
  }

  // ────────────────────────────────────────
  // AI MESSAGE
  // ────────────────────────────────────────

  return (

    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">

      <div className="max-w-4xl w-full">

        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="flex items-center justify-between mb-6">

            <div className="flex items-center gap-4">

              {/* Logo */}

              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg">

                <Scale size={22} />

              </div>

              {/* Title */}

              <div>

                <h3 className="text-white font-semibold text-lg">

                  Legal AI

                </h3>

                <p className="text-sm text-zinc-400">

                  AI Legal Assistant

                </p>

              </div>

            </div>

            {/* Actions */}

            <div className="flex items-center gap-2">

              {/* Copy */}

              <button
                onClick={handleCopy}

                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200"
              >

                {
                  copied
                    ? (
                      <Check
                        size={18}
                        className="text-green-400"
                      />
                    )
                    : (
                      <Copy
                        size={18}
                        className="text-zinc-300"
                      />
                    )
                }

              </button>

              {/* Regenerate */}

              {
                onRegenerate && (

                  <button
                    onClick={onRegenerate}

                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200"
                  >

                    <RotateCcw
                      size={18}
                      className="text-zinc-300"
                    />

                  </button>
                )
              }

            </div>

          </div>

          {/* Markdown Content */}

          <div className="prose prose-invert max-w-none prose-pre:p-0 prose-code:text-white">

            <ReactMarkdown

              remarkPlugins={[
                remarkGfm
              ]}

              components={{

                code({

                  inline,

                  className,

                  children,

                  ...props

                }: {

                  inline?: boolean

                  className?: string

                  children?: React.ReactNode
                }) {

                  const match =
                    /language-(\w+)/.exec(
                      className || ""
                    )

                  return !inline &&
                    match ? (

                    <div className="rounded-2xl overflow-hidden border border-white/10 my-5">

                      <SyntaxHighlighter
                        style={atomOneDark}
                        language={match[1]}
                        PreTag="div"
                      >

                        {
                          String(children)
                            .replace(/\n$/, "")
                        }

                      </SyntaxHighlighter>

                    </div>

                  ) : (

                    <code
                      className="bg-black/40 px-2 py-1 rounded-md text-sm"
                      {...props}
                    >

                      {children}

                    </code>
                  )
                },

                h1({ children }) {

                  return (

                    <h1 className="text-3xl font-bold mt-8 mb-4">

                      {children}

                    </h1>
                  )
                },

                h2({ children }) {

                  return (

                    <h2 className="text-2xl font-semibold mt-7 mb-4">

                      {children}

                    </h2>
                  )
                },

                p({ children }) {

                  return (

                    <p className="leading-8 text-zinc-200 mb-4">

                      {children}

                    </p>
                  )
                },

                ul({ children }) {

                  return (

                    <ul className="list-disc ml-6 mb-4 space-y-2">

                      {children}

                    </ul>
                  )
                },

                ol({ children }) {

                  return (

                    <ol className="list-decimal ml-6 mb-4 space-y-2">

                      {children}

                    </ol>
                  )
                },

                blockquote({
                  children
                }) {

                  return (

                    <blockquote className="border-l-4 border-violet-500 pl-4 italic text-zinc-300 my-4">

                      {children}

                    </blockquote>
                  )
                },
              }}
            >

              {
                content +
                (
                  isStreaming
                    ? <span className="animate-pulse text-violet-400"> ▍ </span>
                    : ""
                )
              }

            </ReactMarkdown>

          </div>

          {/* Citations */}

          {
            citations.length > 0 && (

              <div className="mt-8 pt-6 border-t border-white/10">

                {/* References Header */}

                <button
                  onClick={() =>
                    setShowReferences(
                      !showReferences
                    )
                  }

                  className="w-full flex items-center justify-between mb-5"
                >

                  <div>

                    <h4 className="text-sm font-semibold text-zinc-300">

                      Legal References

                    </h4>

                    <p className="text-xs text-zinc-500 mt-1">

                      {
                        citations.length
                      } legal sources retrieved

                    </p>

                  </div>

                  <div className="text-zinc-400">

                    {
                      showReferences
                        ? (
                          <ChevronUp
                            size={18}
                          />
                        )
                        : (
                          <ChevronDown
                            size={18}
                          />
                        )
                    }

                  </div>

                </button>

                {/* Citation Cards */}

                {
                  showReferences && (

                    <div className="space-y-4 animate-in fade-in duration-300">

                      {
                        citations.map(
                          (
                            citation,
                            index
                          ) => (

                            <CitationCard
                              key={index}

                              act={
                                citation.act
                              }

                              section={
                                citation.section
                              }

                              chapter={
                                citation.chapter
                              }

                              year={
                                citation.year
                              }

                              score={
                                citation.score
                              }

                              preview={
                                citation.preview
                              }
                            />
                          )
                        )
                      }

                    </div>
                  )
                }

              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}
