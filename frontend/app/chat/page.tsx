"use client"
import React, { useEffect, useState } from 'react';
import { chat_service, useAppData, User } from '../context/AppContext';
import { useRouter } from 'next/navigation';
import Loading from '../components/Loading';
import ChatSidebar from '../components/ChatSidebar';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';

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
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAllUser, setShowAllUser] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState<NodeJS.Timeout | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, router, loading]);

  const handleLogout = () => logoutUser();

  async function fetchChat() {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.get(`${chat_service}/api/v1/message/${selectedUser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(data.messages);
      setUser(data.user);
      await fetchChats();
    } catch (error) {
      console.log(error);
      toast.error("Failed to load messages");
    }
  }

  async function createChat(u: User) {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(`${chat_service}/api/v1/chat/new`, {
        userId: loggedInUser?._id,
        otherUserId: u._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedUser(data.chatId);
      setShowAllUser(false);
      await fetchChats();
    } catch (error) {
      toast.error("Failed to start chat");
    }
  }

  useEffect(() => {
    if (selectedUser) {
      fetchChat();
    }
  }, [selectedUser]);

  if (loading) return <Loading />
  return (
    <div className='min-h-screen flex bg-gray-900 text-white relative overflow-hidden'>
      <ChatSidebar sidebarOpen={siderbarOpen} setSidebarOpen={setSiderbarOpen} showAllUsers={showAllUser}
        setShowAllUsers={setShowAllUser} users={users} loggedInUser={loggedInUser} chats={chats}
        selectedUser={selectedUser} setSelectedUser={setSelectedUser} handleLogout={handleLogout}
        createChat={createChat} />

      <div className="flex-1 flex flex-col justify-between p-4 backdrop-blur-xl bg-white/5 border 
      border-white/10">
        <ChatHeader user={user} setSideBarOpen={setSiderbarOpen} isTyping={isTyping} />

        <ChatMessages selectedUser={selectedUser} messages={messages} loggedInUser={loggedInUser} />
      </div>
    </div>
  )
}

export default ChatApp;