'use client'

import { ChatListContext } from '@/app/theme-provider'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export const SingleChat = ({
  id,
  title,
  isActive,
  type,
}: {
  id: number
  title: string
  isActive: boolean
  type: string
}) => {
  const { chats, setChats } = useContext(ChatListContext)
  const router = useRouter()

  const handleClick = async () => {
    const chat = chats.find((chat: any) => chat.id === id)

    if (chat && chat.type === 'hello' && chat.body[0].answer === 'loading') {
      const response = await fetch('http://localhost:8080/hello', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      })

      if (response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false

        while (!done) {
          const { value, done: readerDone } = await reader.read()
          console.log('value: ', decoder.decode(value))
          if (value) {
            chat!.body[0].answer = decoder.decode(value)
          }
          done = readerDone
        }

        setChats([
          ...chats.map((chat: any) => {
            if (chat.id === id) {
              return {
                ...chat,
                isActive: true,
              }
            }
            return {
              ...chat,
              isActive: false,
            }
          }),
        ])
        //navigate to chat page
        router.push(`/chat/${id}`)
        return
      }
    }

    if (
      chat &&
      chat.type === 'send' &&
      chat.body[0].answer === 'loading' &&
      chat.body[0].question === 'Chi vincerà la sfida?'
    ) {
      const response = await fetch('http://localhost:8080/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: 'Say the word "Sudoers"',
        }),
      })

      if (response.body) {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let done = false

        while (!done) {
          const { value, done: readerDone } = await reader.read()
          console.log('value: ', decoder.decode(value))
          try {
            if (value) {
              chat!.body[0].answer = JSON.parse(decoder.decode(value)).response
            }
          } catch (err) {
            console.log(err)
            if (value) {
              if (chat!.body[0].answer === 'loading') {
                chat!.body[0].answer = decoder.decode(value)
              } else {
                chat!.body[0].answer += decoder.decode(value)
              }
            }
          }
          done = readerDone
        }

        setChats([
          ...chats.map((chat: any) => {
            if (chat.id === id) {
              return {
                ...chat,
                isActive: true,
              }
            }
            return {
              ...chat,
              isActive: false,
            }
          }),
        ])
        //navigate to chat page
        router.push(`/chat/${id}`)
        console.log('chats: ', chats)
        return
      }
    }

    if (chat && chat.type === 'adventure') {
      router.push(`/adventure`)
      return
    }
    console.log(chat?.type)
    setChats(
      chats.map((chat: any) => {
        if (chat.id === id) {
          return {
            ...chat,
            isActive: true,
          }
        }
        return {
          ...chat,
          isActive: false,
        }
      }),
    )
    router.push(`/chat/${id}`)
  }

  return (
    <div
      className={`flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 group animate-flash
         ${!isActive ? 'hover:bg-[#2A2B32]' : 'bg-[#343541]'}`}
      onClick={handleClick}
    >
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
        {title}
      </div>
      {isActive && (
        <div className="absolute flex right-1 z-10 text-gray-300 visible">
          <div className="p-1 hover:text-white">
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
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
          <div className="p-1 hover:text-white">
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
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
