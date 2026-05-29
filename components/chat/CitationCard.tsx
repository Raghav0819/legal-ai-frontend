"use client"

import { useState } from "react"

import {
  ChevronDown,
  ChevronUp,
  Scale,
  BookOpen,
} from "lucide-react"

interface CitationCardProps {

  act: string

  section: string

  chapter?: string

  year?: string | number

  score?: number

  preview?: string
}

export default function CitationCard({

  act,

  section,

  chapter,

  year,

  score,

  preview,

}: CitationCardProps) {

  const [expanded,
  setExpanded] =
    useState(false)

  // Confidence color

  const confidenceColor =
    score && score > 0.85
      ? "text-green-400"
      : score && score > 0.7
      ? "text-yellow-400"
      : "text-red-400"

  return (

    <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 overflow-hidden">

      {/* Top */}

      <button
        onClick={() =>
          setExpanded(
            !expanded
          )
        }

        className="w-full flex items-start justify-between gap-4 p-4 text-left"
      >

        <div className="flex gap-4">

          {/* Icon */}

          <div className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center shrink-0 shadow-lg">

            <Scale size={20} />

          </div>

          {/* Content */}

          <div>

            {/* Badge */}

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/20 text-violet-300 text-xs font-medium mb-3">

              <BookOpen size={13} />

              Legal Reference

            </div>

            {/* Act */}

            <h3 className="text-white font-semibold leading-6">

              {act}

            </h3>

            {/* Section */}

            <p className="text-zinc-400 text-sm mt-1">

              Section {section}

              {
                chapter &&
                ` • ${chapter}`
              }

              {
                year &&
                ` • ${year}`
              }

            </p>

            {/* Confidence */}

            {
              score !== undefined && (

                <div className="mt-3 flex items-center gap-2">

                  <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">

                    <div
                      className={`h-full ${
                        score > 0.85
                          ? "bg-green-400"
                          : score > 0.7
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                      style={{
                        width:
                          `${score * 100}%`,
                      }}
                    />

                  </div>

                  <span
                    className={`text-xs font-medium ${confidenceColor}`}
                  >

                    {
                      Math.round(
                        score * 100
                      )
                    }%

                  </span>

                </div>
              )
            }

          </div>

        </div>

        {/* Expand */}

        <div className="text-zinc-400 mt-1">

          {
            expanded
              ? <ChevronUp size={18} />
              : <ChevronDown size={18} />
          }

        </div>

      </button>

      {/* Expandable Preview */}

      {
        expanded && preview && (

          <div className="px-5 pb-5">

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">

              <p className="text-sm text-zinc-300 leading-7 whitespace-pre-wrap">

                {preview}

              </p>

            </div>

          </div>
        )
      }

    </div>
  )
}
