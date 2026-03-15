"use client"
import React, { useEffect, useState } from 'react';
import { useAppData, User } from '../context/AppContext';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';
import ChatSidebar from '../components/ChatSidebar';

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  text?: string;
  imgae?: {
    url: string;
    publicId: string;
  };
  messageType: "text" | "image";
  seen: boolean;
  seenAt?: string;
  createdAt: string;
}

const ChatApp = () => {
  const { isAuth, loading, logoutUser, fetchChats, user: loggedInUser,
    chats, users, setChats } = useAppData();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [siderbarOpen, setSiderbarOpen] = useState(false);
  const [messages, setMessages] = useState<Message | null>(null);
  const [user, setuser] = useState<User | null>(null);
  const [showAllUser, setShowAllUser] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  const handleLogout= ()=> logoutUser();

  if (loading) return <Loading />
  return (
    <div className='min-h-screen flex bg-gray-900 text-white relative overflow-hidden'>
      <ChatSidebar sidebarOpen={siderbarOpen} setSidebarOpen={setSiderbarOpen} showAllUsers={showAllUser} 
      setShowAllUsers={setShowAllUser} users={users} loggedInUser={loggedInUser} chats={chats}
      selectedUser={selectedUser} setSelectedUser={setSelectedUser} handleLogout={handleLogout} />
    </div>
  )
}

export default ChatApp