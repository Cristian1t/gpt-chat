"use client";

import { ChatListContext } from '@/app/theme-provider';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

export const NewChatButton = () => {
    const { chats, setChats } = useContext(ChatListContext);
    const router = useRouter();
    const pathname = usePathname();

    const HandleClick = () => {
        // const newChat = {
        //     id: chats.length,
        //     title: "New chat",
        //     isActive: false,
        // };
        // setChats([...chats, newChat]);

        // set all chats to inactive in context
        setChats(chats.map((chat) => {
            chat.isActive = false;
            return chat;
        }));


        if (pathname !== "/chat") {
            router.push("/chat");
        }
    };

    return (
        <button onClick={HandleClick}>
            <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
                <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New chat
            </a>
        </button>
    );
};
