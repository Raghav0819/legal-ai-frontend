"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  ChatMessage,
  Conversation,
} from "@/types"

import {
  parseStreamingResponse,
} from "@/lib/stream"

const API_BASE_URL =
  "https://legal-ai-backend-7tbs.onrender.com"

export function useChat() {

  // ────────────────────────────────────────
  // State
  // ────────────────────────────────────────

  const [messages,
  setMessages] =
    useState<ChatMessage[]>([])

  const [conversations,
  setConversations] =
    useState<Conversation[]>([])

  const [
    activeConversationId,

    setActiveConversationId,

  ] =
    useState<number | null>(
      null
    )

  const [loading,
  setLoading] =
    useState(false)

  const [streamingText,
  setStreamingText] =
    useState("")

  // ────────────────────────────────────────
  // Load Conversations
  // ────────────────────────────────────────

  const loadConversations =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            `${API_BASE_URL}/conversations`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        if (!response.ok) {

          throw new Error(
            "Failed to load conversations"
          )
        }

        const data =
          await response.json()

        setConversations(data)

      } catch (error) {

        console.error(error)
      }
    }

  // ────────────────────────────────────────
  // Create Conversation
  // ────────────────────────────────────────

  const createConversation =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            `${API_BASE_URL}/conversations`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        if (!response.ok) {

          throw new Error(
            "Conversation creation failed"
          )
        }

        const data =
          await response.json()

        setActiveConversationId(
          data.conversation_id
        )

        await loadConversations()

        return data.conversation_id

      } catch (error) {

        console.error(error)

        return null
      }
    }

  // ────────────────────────────────────────
  // Load Messages
  // ────────────────────────────────────────

  const loadMessages =
    async (
      conversationId: number
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            `${API_BASE_URL}/conversations/${conversationId}/messages`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        if (!response.ok) {

          throw new Error(
            "Failed to load messages"
          )
        }

        const data =
          await response.json()

        setMessages(data)

      } catch (error) {

        console.error(error)
      }
    }

  // ────────────────────────────────────────
  // Send Message
  // ────────────────────────────────────────

  const sendMessage =
    async (
      query: string
    ) => {

      try {

        setLoading(true)

        let convoId =
          activeConversationId

        // Create new conversation
        if (!convoId) {

          convoId =
            await createConversation()
        }

        if (!convoId) {

          throw new Error(
            "Conversation creation failed"
          )
        }

        // User message
        const userMessage:
          ChatMessage = {

          role: "user",

          content: query,
        }

        setMessages((prev) => [

          ...prev,

          userMessage,
        ])

        // Request
        const token =
          localStorage.getItem(
            "token"
          )

        const response =
          await fetch(
            `${API_BASE_URL}/chat/stream`,
            {
              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({

                query,

                conversation_id:
                  convoId,
              }),
            }
          )

        if (!response.ok) {

          throw new Error(
            "Streaming failed"
          )
        }

        // Stream parser
        let fullText = ""

        setStreamingText("")

        await parseStreamingResponse(

          response,

          (token) => {

            fullText += token

            setStreamingText(
              fullText
            )
          }
        )

        // Final AI message
        const assistantMessage:
          ChatMessage = {

          role:
            "assistant",

          content:
            fullText,
        }

        setMessages((prev) => [

          ...prev,

          assistantMessage,
        ])

        setStreamingText("")

        // Refresh sidebar
        await loadConversations()

      } catch (error) {

        console.error(
          "Chat error:",
          error
        )

      } finally {

        setLoading(false)
      }
    }

  // ────────────────────────────────────────
  // New Chat
  // ────────────────────────────────────────

  const newChat = () => {

    setMessages([])

    setActiveConversationId(
      null
    )
  }

  // ────────────────────────────────────────
  // Select Conversation
  // ────────────────────────────────────────

  const selectConversation =
    async (
      id: number
    ) => {

      setActiveConversationId(id)

      await loadMessages(id)
    }

  // ────────────────────────────────────────
  // Initial Load
  // ────────────────────────────────────────

  useEffect(() => {

    const init =
      async () => {

        await loadConversations()
      }

    init()

  }, [])

  return {

    messages,

    conversations,

    activeConversationId,

    loading,

    streamingText,

    sendMessage,

    newChat,

    selectConversation,
  }
}

