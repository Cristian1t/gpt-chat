'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import React, { createContext } from 'react'

type SetChats = React.Dispatch<
  React.SetStateAction<
    {
      id: number
      title: string
      type: string
      isActive: boolean
      body: QAPair[]
    }[]
  >
>

interface QAPair {
  id: number
  question: string
  answer: string
}

export const ChatListContext = createContext<{
  chats: {
    id: number
    title: string
    type: string
    isActive: boolean
    body: QAPair[]
  }[]
  setChats: SetChats
  endpoint: string
  setEndpoint: React.Dispatch<React.SetStateAction<string>>
}>({
  chats: [
    {
      id: 0,
      title: 'Hello World',
      type: 'hello',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'Hello chat gpt :)',
          answer: 'loading',
        },
      ],
    },
    {
      id: 1,
      title: 'Echo',
      type: 'send',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'Where are you from?',
          answer: 'loading',
        },
      ],
    },
    {
      id: 2,
      title: 'Text Adventure',
      type: 'adventure',
      isActive: false,
      body: [],
    },
  ],
  setChats: () => {},
  endpoint: 'send',
  setEndpoint: () => {},
})

export function ThemeProvider(
  props: ThemeProviderProps,
  { children }: { children: React.ReactNode },
) {
  const [chats, setChats] = React.useState<
    {
      id: number
      title: string
      type: string
      isActive: boolean
      body: QAPair[]
    }[]
  >([
    {
      id: 0,
      title: 'Hello World',
      type: 'hello',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'Hello chat gpt :)',
          answer: 'loading',
        },
      ],
    },
    {
      id: 1,
      title: 'Echo',
      type: 'send',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'Chi vincerà la sfida?',
          answer: 'loading',
        },
      ],
    },
    {
      id: 2,
      title: 'Text Adventure',
      type: 'adventure',
      isActive: false,
      body: [],
    },
  ])
  const [endpoint, setEndpoint] = React.useState('send')

  const value = React.useMemo(
    () => ({ chats, setChats, endpoint, setEndpoint }),
    [chats, endpoint],
  )

  return (
    <ChatListContext.Provider value={value}>
      <NextThemesProvider {...props} />
      {children}
    </ChatListContext.Provider>
  )
}
