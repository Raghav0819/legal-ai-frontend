"use client"

import {
  Plus,
  MessageSquare,
  Trash2,
  Scale,
} from "lucide-react"

import {
  Conversation,
} from "@/types"

interface SidebarProps {

  conversations:
    Conversation[]

  activeId:
    number | null

  onSelect:
    (id: number) => void

  onNewChat:
    () => void
}

export default function Sidebar({

  conversations,

  activeId,

  onSelect,

  onNewChat,

}: SidebarProps) {

  return (

    <aside className="hidden md:flex w-80 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl">

      {/* Logo */}

      <div className="p-6 border-b border-white/10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg">

            <Scale className="w-7 h-7" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">

              Legal AI

            </h1>

            <p className="text-sm text-zinc-400">

              Indian Legal Assistant

            </p>

          </div>

        </div>

      </div>

      {/* New Chat */}

      <div className="p-4">

        <button
          onClick={onNewChat}

          className="w-full flex items-center justify-center gap-3 h-12 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition"
        >

          <Plus size={18} />

          New Chat

        </button>

      </div>

      {/* Conversation List */}

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">

        {

          conversations.length === 0 && (

            <div className="text-zinc-500 text-sm text-center pt-10">

              No conversations yet

            </div>
          )
        }

        {

          conversations.map(
            (conversation) => (

              <button
                key={conversation.id}

                onClick={() =>
                  onSelect(
                    conversation.id
                  )
                }

                className={`w-full flex items-center justify-between rounded-2xl px-4 py-3 transition border ${
                  activeId ===
                  conversation.id
                    ? "bg-white/10 border-white/10"
                    : "border-transparent hover:bg-white/5"
                }`}
              >

                <div className="flex items-center gap-3 overflow-hidden">

                  <MessageSquare
                    size={18}
                    className="text-zinc-400"
                  />

                  <span className="truncate text-sm text-white">

                    {
                      conversation.title
                    }

                  </span>

                </div>

                <Trash2
                  size={16}
                  className="text-zinc-500 hover:text-red-400 transition"
                />

              </button>
            )
          )
        }

      </div>

    </aside>
  )
}

