import { outputSchema } from '@/schema/modeOutput'
import { z } from 'zod';

export type Roles =
    | 'function'
    | 'system'
    | 'user'
    | 'assistant'
    | 'data'
    | 'tool'

export interface ChatHistory {
    role: Roles
    content: string | z.infer<typeof outputSchema>
}

export interface ChatHistoryParsed {
    role: Roles
    content: string
}

//now we make all the chat history into string
export const parseChatHistory = (chatHistory: ChatHistory[]): ChatHistoryParsed[] => {
    return chatHistory.map((history) => ({
        role: history.role,
        content: typeof history.content === 'string' ? history.content : JSON.stringify(history.content),
    }))
}


