'use client'

import { ChatListContext } from '@/app/theme-provider'
import { SingleChat } from '@/components/singleChat'
import { useContext } from 'react'

export const ChatList = () => {
  const { chats } = useContext(ChatListContext)

  return (
    <div className="flex flex-col gap-2 text-gray-100 text-sm">
      {chats.map((chat) => (
        <SingleChat
          key={chat.id}
          id={chat.id}
          title={chat.title}
          isActive={chat.isActive}
          type={chat.type}
        />
      ))}
    </div>
  )
}
