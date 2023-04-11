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
          question: 'This will do a GET request to ChatGpt API',
          answer: 'Hello! How can I assist you today?',
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
          answer: 'I am from the internet.',
        },
      ],
    },
    {
      id: 2,
      title: 'Text Adventure',
      type: 'adventure',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'What is your job?',
          answer: 'I am a chatbot.',
        },
        {
          id: 1,
          question: 'What is your sdf?',
          answer:
            "Bite off human's toes slap kitten brother with paw growl at dogs in my sleep yet run outside as soon as door open or give me some of your food give me some of your food give me some of your food meh, i don't want it scratch the postman wake up lick paw wake up owner meow meow. Meow loudly just to annoy owners drool so do doodoo in the litter-box, clickityclack on the piano, be frumpygrumpy. Go into a room to decide you didn't want to be in there anyway chase red laser dot and i can haz human is behind a closed door, emergency! abandoned! meeooowwww!!! i rule on my back you rub my tummy i bite you hard so chase imaginary bugs. Sit in a box for hours lounge in doorway or eats owners hair then claws head kitty kitty pussy cat doll jump on fridge.",
        },
      ],
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
          question: 'This will do a GET request to ChatGpt API',
          answer: 'Hello! How can I assist you today?',
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
          question: 'Tell me a Chuck Norris joke',
          answer:
            'Chuck Norris originally appeared in the "Street Fighter II" video game, but was removed by Beta Testers because every button caused him to do a roundhouse kick. When asked about this glitch, Norris replied "That\'s no glitch."',
        },
      ],
    },
    {
      id: 2,
      title: 'Text Adventure',
      type: 'adventure',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'What is your job?',
          answer: 'I am a chatbot.',
        },
        {
          id: 1,
          question: 'What is your sdf?',
          answer:
            "Bite off human's toes slap kitten brother with paw growl at dogs in my sleep yet run outside as soon as door open or give me some of your food give me some of your food give me some of your food meh, i don't want it scratch the postman wake up lick paw wake up owner meow meow. Meow loudly just to annoy owners drool so do doodoo in the litter-box, clickityclack on the piano, be frumpygrumpy. Go into a room to decide you didn't want to be in there anyway chase red laser dot and i can haz human is behind a closed door, emergency! abandoned! meeooowwww!!! i rule on my back you rub my tummy i bite you hard so chase imaginary bugs. Sit in a box for hours lounge in doorway or eats owners hair then claws head kitty kitty pussy cat doll jump on fridge.",
        },
      ],
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
