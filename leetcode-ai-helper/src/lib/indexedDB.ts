//But what about accessing previous messages and chat data when offline? This is where IndexedDB comes into play.
//IndexedDB is a web storage API that allows you to store and retrieve data from the user's browser.

import { openDB, DBSchema } from "idb";
import { ChatHistory } from "@/interface/chatHistory";

interface ChatDB extends DBSchema {
    chats: {
        key: string;
        value: { problemName: string; chatHistory: ChatHistory[] }
    };
}

//This code provides helper functions to store, retrieve, and delete chat history for a given problemName using IndexedDB.

const dbPromise = openDB<ChatDB>("chatDB", 1, {
    upgrade(db) {
        db.createObjectStore('chats', { keyPath: "problemName" });
    },
});


//saving chat history in indexedDB
//Uses put(), which inserts a new entry or updates an existing one.
export const saveChatHistory = async (
    problemName: string,
    history: ChatHistory[]
) => {
    const db = await dbPromise
    await db.put('chats', { problemName, chatHistory: history })
}

export const getChatHistory = async (problemName: string, limit: number, offset: number) => {
    const db = await dbPromise;
    const chatData = await db.get('chats', problemName)
    if (!chatData) return { totalMessageCount: 0, chatHistory: [] }

    const { chatHistory } = chatData;
    const totalMessageCount = chatHistory.length;

    // Fetch the slice of chat history based on limit and offset
    const slicedHistory = chatHistory.slice(
        Math.max(totalMessageCount - offset - limit, 0),
        totalMessageCount - offset
    )
    return {
        totalMessageCount,
        chatHistory: slicedHistory,
        allChatHistory: chatHistory || [],
    }
}

export const clearChatHistory = async (problemName: string) => {
    const db = await dbPromise
    await db.delete('chats', problemName)
}


export const LIMIT_VALUE = 10;
