'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import React, { createContext } from 'react'

type SetChats = React.Dispatch<
  React.SetStateAction<
    { id: number; title: string; isActive: boolean; body: QAPair[] }[]
  >
>

interface QAPair {
  id: number
  question: string
  answer: string
}

export const ChatListContext = createContext<{
  chats: { id: number; title: string; isActive: boolean; body: QAPair[] }[]
  setChats: SetChats
}>({
  chats: [
    {
      id: 0,
      title: 'Hello World',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'What is your name?',
          answer: 'My name is Echo.',
        },
      ],
    },
    {
      id: 1,
      title: 'Echo',
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
})

export function ThemeProvider(
  props: ThemeProviderProps,
  { children }: { children: React.ReactNode },
) {
  const [chats, setChats] = React.useState<
    {
      id: number
      title: string
      isActive: boolean
      body: QAPair[]
    }[]
  >([
    {
      id: 0,
      title: 'Hello World',
      isActive: false,
      body: [
        {
          id: 0,
          question: 'What is your name?',
          answer: 'My name is Echo.',
        },
      ],
    },
    {
      id: 1,
      title: 'Echo',
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

  const value = React.useMemo(() => ({ chats, setChats }), [chats])

  return (
    <ChatListContext.Provider value={value}>
      <NextThemesProvider {...props} />
      {children}
    </ChatListContext.Provider>
  )
}
