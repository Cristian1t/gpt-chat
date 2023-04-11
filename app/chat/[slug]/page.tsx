'use client'

import { ChatListContext } from '@/app/theme-provider'
import ChatLine from '@/components/chatLine'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'

export default function ExistingChat({ params }: { params: { slug: string } }) {
  const { chats } = useContext(ChatListContext)
  const chat = chats.find((chat: any) => chat.id === +params.slug)
  const router = useRouter()

  useEffect(() => {
    if (!chat) {
      router.push('/chat')
    }
    if (chat && chat.type === 'hello') {
      fetch('api/hello')
        .then((res) => res.json())
        .then((data) => {
          console.log('data: ', data)
        })

      console.log('hello')
    }
    if (chat && chat.type === 'send') {
      console.log('send')
    }
    if (chat && chat.type === 'adventure') {
      console.log('adventure')
    }
  }, [chat, router])

  return (
    <div className="flex flex-col items-center text-sm dark:bg-[#343541] h-full">
      {chat && <ChatLine body={chat.body} key={chat.id} />}
    </div>
  )
}
