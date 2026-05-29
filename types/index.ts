export interface Message {

  role:
    | "user"
    | "assistant"

  content: string
}


export interface Citation {

  act: string

  section: string

  chapter?: string

  year?: string | number

  score?: number

  preview?: string
}



export interface ChatMessage {

  id?: number

  role:
    | "user"
    | "assistant"

  content: string

  citations?: Citation[]

  created_at?: string
}

export interface Conversation {

  id: number

  title: string

  created_at?: string
}

export interface ChatResponse {

  answer: string

  language: string

  intent: string

  citations: Citation[]

  draft?: string

  error?: string

  session_id?: string
}