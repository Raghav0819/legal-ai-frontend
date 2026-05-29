"use client"

import {
  useState,
  useEffect,
  useRef,
} from "react"

import {
  Send,
} from "lucide-react"

import Sidebar
from "@/components/layout/Sidebar"

import MessageBubble
from "@/components/chat/MessageBubble"

import StreamingLoader
from "@/components/chat/StreamingLoader"

import {
  useChat,
} from "@/hooks/useChat"

export default function ChatPage() {

  // ────────────────────────────────────────
  // Hook
  // ────────────────────────────────────────

  const {

    messages,

    conversations,

    activeConversationId,

    loading,

    streamingText,

    sendMessage,

    newChat,

    selectConversation,

  } = useChat()

  // ────────────────────────────────────────
  // Local State
  // ────────────────────────────────────────

  const [input,
  setInput] =
    useState("")

  const bottomRef =
    useRef<HTMLDivElement>(
      null
    )

  // ────────────────────────────────────────
  // Auto Scroll
  // ────────────────────────────────────────

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth",
    })

  }, [
    messages,
    streamingText,
  ])

  // ────────────────────────────────────────
  // Send
  // ────────────────────────────────────────

  const handleSend =
    async () => {

      if (!input.trim()) {

        return
      }

      const question = input

      setInput("")

      await sendMessage(question)
    }

  return (

    <div className="flex h-screen bg-black text-white overflow-hidden">

      {/* Sidebar */}

      <Sidebar

        conversations={
          conversations
        }

        activeId={
          activeConversationId
        }

        onSelect={
          selectConversation
        }

        onNewChat={
          newChat
        }
      />

      {/* Main */}

      <main className="flex-1 relative overflow-hidden">

        {/* Glow */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] bg-violet-600 rounded-full blur-[140px] opacity-20" />

          <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-500 rounded-full blur-[140px] opacity-20" />

        </div>

        {/* Content */}

        <div className="relative z-10 flex flex-col h-full">

          {/* Header */}

          <header className="h-20 border-b border-white/10 backdrop-blur-xl flex items-center px-8">

            <div>

              <h1 className="text-xl font-semibold">

                Legal AI Assistant

              </h1>

              <p className="text-sm text-zinc-400">

                Ask legal questions in Hindi or English

              </p>

            </div>

          </header>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto px-8 py-8">

            <div className="max-w-4xl mx-auto space-y-6">

              {/* Empty State */}

              {
                messages.length === 0 &&

                !loading && (

                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

                    <p className="text-zinc-300 leading-8">

                      Welcome to Legal AI.

                      Ask questions about:
                      IPC,
                      Constitution,
                      RTI,
                      FIR,
                      bail,
                      consumer rights,
                      domestic violence,
                      and more.

                    </p>

                  </div>
                )
              }

              {/* Messages */}

              {
                messages.map(
                  (
                    message,
                    index
                  ) => (

                    <MessageBubble
                      key={index}

                      role={
                        message.role
                      }

                      content={
                        message.content
                      }

                      citations={
                        message.citations || []
                      }
                    />
                  )
                )
              }

              {/* Loader */}

              {
                loading &&
                !streamingText && (

                  <StreamingLoader />
                )
              }

              {/* Streaming */}

              {
                streamingText && (

                  <MessageBubble

                    role="assistant"

                    content={
                      streamingText
                    }

                    isStreaming={true}
                  />
                )
              }

              {/* Bottom */}

              <div ref={bottomRef} />

            </div>

          </div>

          {/* Input */}

          <div className="p-6 border-t border-white/10 backdrop-blur-xl">

            <div className="max-w-4xl mx-auto">

              <div className="flex items-center gap-4 rounded-3xl bg-white/5 border border-white/10 px-5 py-4 backdrop-blur-xl">

                <input
                  value={input}

                  onChange={(e) =>
                    setInput(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (
                      e.key === "Enter"
                    ) {

                      handleSend()
                    }
                  }}

                  placeholder="Ask your legal question..."

                  className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
                />

                <button
                  onClick={handleSend}

                  disabled={loading}

                  className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition disabled:opacity-50"
                >

                  <Send size={20} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}
