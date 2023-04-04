'use client'

import { ChatListContext } from '@/app/theme-provider'
import ChatLine from '@/components/chatLine'
import { useContext } from 'react'

export default function ExistingChat({ params }: { params: { slug: string } }) {
  const { chats } = useContext(ChatListContext)
  const chat = chats.find((chat: any) => chat.id === +params.slug)

  return <>{chat && <ChatLine body={chat.body} key={chat.id} />}</>
}
