import React, { useEffect, useMemo, useRef } from 'react'
import { Message } from '../chat/page';
import { User } from '../context/AppContext';

interface ChatMessagesProps {
    selectedUser: string | null;
    messages: Message[] | null;
    loggedInUser: User | null;
}

const ChatMessages = ({ selectedUser, messages, loggedInUser }: ChatMessagesProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Seen Feature
    const uniqueMessages = useMemo(() => {
        if (!messages) return [];
        const seen = new Set();
        return messages.filter((message) => {
            if (seen.has(message._id)) {
                return false;
            }
            seen.add(message._id);
            return true;
        });
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedUser, uniqueMessages]);

    return <div className=''>ChatMessages</div>;
}

export default ChatMessages;