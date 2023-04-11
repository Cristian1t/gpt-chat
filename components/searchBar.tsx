'use client'

import { ChatListContext } from '@/app/theme-provider'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

export const SearchBar = () => {
  const [text, setText] = useState<string>('')
  const { chats, setChats, endpoint, setEndpoint } = useContext(ChatListContext)
  const router = useRouter()
  const pathname = usePathname()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const localChats = useRef(chats)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e as any)
      setText('')
    }
  }

  async function fetchAnswer() {
    await fetch('https://api.chucknorris.io/jokes/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const activeChat = localChats.current.find((chat) => chat.isActive)
        if (activeChat) {
          activeChat.body[0].answer = data.value
          setChats(() => [...localChats.current])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (text === '') return
    if (pathname === '/chat') {
      localChats.current = [
        ...chats,
        {
          id: localChats.current.length,
          title: text,
          type: 'send',
          isActive: true,
          body: [
            {
              id: 0,
              question: text,
              answer: 'loading',
            },
          ],
        },
      ]
      setChats(localChats.current)
      router.push(`/chat/${chats.length}`)
      await fetchAnswer()
    } else {
      const activeChat = chats.find((chat) => chat.isActive)
      if (activeChat) {
        activeChat.body.push({
          id: activeChat.body.length,
          question: text,
          answer: '',
        })
        setChats((prev) => [...prev])
      }
    }
    setText('')
    textAreaRef.current!.style.height = '24px'
  }

  // find the chat with the same id as the current pathname
  const chat = chats.find((chat: any) => chat.id === +pathname.split('/')[2])

  useEffect(() => {
    if (chat) {
      setEndpoint(chat.type)
    }
  }, [chat, setEndpoint])

  return (
    <>
      {pathname !== '/adventure' && (
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-[#343541] md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          {endpoint !== 'hello' && (
            <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
              <div className="relative flex h-full flex-1 md:flex-col">
                <div className="flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center"></div>
                <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-[#40414F] rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                  <textarea
                    data-id="root"
                    placeholder="Send a message..."
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    value={text}
                    ref={textAreaRef}
                    className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 outline-0"
                    style={{
                      maxHeight: '200px',
                      height: '24px',
                      overflowY: 'hidden',
                    }}
                  ></textarea>
                  <button
                    onClick={handleSubmit}
                    className="absolute p-1 rounded-md text-[#9999A9] bottom-1.5 md:bottom-2.5 hover:bg-gray-100 enabled:dark:hover:text-gray-400 dark:hover:bg-[#202123] disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2 disabled:opacity-40"
                    disabled={text.length === 0}
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-1"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          )}
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <a
              href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              ChatGFT{' '}
              {new Date()
                .toLocaleDateString('it-IT', {
                  month: 'long',
                  day: 'numeric',
                })
                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase(),
                )}{' '}
              Version
            </a>
            . Free Research Preview. Our goal is to make AI systems more natural
            and safe to interact with. Your feedback will help us improve.
          </div>
        </div>
      )}
    </>
  )
}
