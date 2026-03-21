import React, { useEffect, useMemo, useRef } from 'react'
import { Message } from '../chat/page';
import { User } from '../context/AppContext';
import moment from 'moment';

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

    return <div className='flex-1 overflow-hidden'>
        <div className="h-full max-h-[calc(100vh-215px)] overflow-y-auto p-2 space-y-2 custom-scroll">
            {
                !selectedUser ? (<p className="text-gray-400 text-center mt-20">Please select user to start chating
                    📩</p>
                ) : (
                    <>
                        {
                            uniqueMessages.map((e, i) => {
                                const isSentByMe = e.senderId === loggedInUser?._id;
                                const uniqueKey = `${e._id}-${i}`

                                return (
                                    <div className={`flex flex-col gap-1 mt-2 ${isSentByMe ? "items-end" : "items-start"
                                        }`}>
                                        <div className={`rounded-lg p-3 max-w-sm ${isSentByMe ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
                                            }`}>
                                            {
                                                e.messageType === "image" && e.image && (
                                                    <div className="relative group">
                                                        <img src={e.image.url} alt="shared image" className='max-w-full
                                                            h-auto rounded-lg' />
                                                    </div>
                                                )
                                            }

                                            {
                                                e.text && <p className="mt-1">{e.text}</p>
                                            }
                                        </div>

                                        <div className={`flex items-center gap-1 text-xs text-gray-400 ${
                                            isSentByMe?"pr-2 flex-row-reverse":"pl-2"
                                        }`}>
                                            <span></span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </>
                )
            }
        </div>
    </div>;
}

export default ChatMessages;