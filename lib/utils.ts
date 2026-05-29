import { type ClassValue, clsx } from "clsx"

import { twMerge } from "tailwind-merge"

/**
 * Tailwind class merger
 */

export function cn(
  ...inputs: ClassValue[]
) {

  return twMerge(
    clsx(inputs)
  )
}

/**
 * Format timestamps
 */

export function formatTime(
  dateString: string
) {

  return new Date(
    dateString
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

/**
 * Truncate long text
 */

export function truncateText(
  text: string,

  length = 120
) {

  if (text.length <= length) {
    return text
  }

  return (
    text.slice(0, length) + "..."
  )
}

/**
 * Detect Hindi text
 */

export function isHindi(
  text: string
) {

  const hindiRegex =
    /[\u0900-\u097F]/

  return hindiRegex.test(text)
}

/**
 * Generate random conversation title
 */

export function generateConversationTitle(
  query: string
) {

  return truncateText(query, 40)
}