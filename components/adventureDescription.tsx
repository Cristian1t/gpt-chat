'use client'
import { ChatListContext } from '@/app/theme-provider'
import MatrixRain from '@/components/matrixCodeRain'
import Spinner from '@/components/spinner'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

import Typed from 'typed.js'

interface DataFromStream {
  id: string
  object: string
  created: number
  model: string
  choices: [
    {
      delta: {
        content: string
      }
      index: number
      finish_reason: string
    },
  ]
}

interface DataFromAdventure {
  context: string
  message: string
  role: string
}

const AdventureDescription = () => {
  const el = useRef(null)
  const el2 = useRef(null)
  const [showInputs, setShowInputs] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [story, setStory] = useState('')
  const { chats, setChats } = useContext(ChatListContext)
  const [isCreatingStory, setIsCreatingStory] = useState(false)
  const router = useRouter()

  const adventureChat = chats.find((chat) => chat.type === 'adventure')
  useEffect(() => {
    console.log('chats', chats)
    console.log('adventureChat', adventureChat)
    if (
      adventureChat &&
      adventureChat.body.length > 0 &&
      adventureChat.body[0]?.answer !== ''
    ) {
      setShowStory(true)
      setStory(adventureChat.body[0]?.answer)
    } else {
      const typed = new Typed(el.current, {
        strings: [
          'Benvenuti alla nostra simulazione futuristica! Sei pronto per vivere\n' +
            'un&apos;esperienza unica e personalizzata in un mondo fantastico?\n' +
            '\n' +
            '\n' +
            '          Tutto ciò che devi fare è inserire tre parole che rappresentino\n' +
            '          l&apos;avventura che stai cercando. Sia che tu stia cercando un mondo\n' +
            '          di magia e mistero o di avventura e azione, le tue parole saranno la\n' +
            '          chiave per creare il tuo mondo ideale.' +
            '\n' +
            '          Quindi, cosa aspetti? Immetti le tue parole e inizia a scoprire il tuo\n' +
            '          mondo di avventure!',
        ],
        typeSpeed: 10,
        showCursor: false,
        onComplete() {
          setTimeout(() => {
            setShowInputs(true)
          }, 500)
        },
      })

      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isCreatingStory) {
      const typed = new Typed(el2.current, {
        strings: [
          'Mi chiamo Loader, Matrix Loader',
          'Non mi chiedere di scegliere tra Node.js e Java, è come chiedere a Neo di scegliere tra la pillola rossa e quella blu',
          'Mi sento come Neo quando entra nella Matrix...pronto a caricare!',
          "C'è un solo modo per uscire da questa schermata di caricamento...seguimi lungo il bianco della console",
          'La mia vita è un ciclo infinito di caricamento...ma almeno ho Node.js per tenermi compagnia',
          "Non c'è bisogno di temere la Matrice quando hai un loader come me!",
          "Node.js mi fa sentire come Morpheus quando dice 'Ti sto offrendo solo la verità, nulla di più'",
          'Mi piace il mio lavoro come loader, ma preferirei essere un programmatore in una realtà virtuale...tipo quella di Matrix!',
          'Non sono un agente della Matrice, sono solo un umile loader che fa il suo lavoro',
          'La vita è come un ciclo di caricamento...a volte sembra infinita, ma alla fine tutto si carica',
          'Il mio motto? Caricare o morire...ma preferirei caricare!',
          "Loading... come in Matrix, il tempo di caricamento è un'illusione.",
          'Sto caricando così tanto che potrei finire in un loop infinito. Speriamo di no!',
          "Loading... Sì, lo so, è come guardare l'erba crescere.",
          'La pillola blu o la pillola rossa? Aspetta, sto ancora caricando la scelta.',
          'Non guardare la barra di caricamento. Sembra che stia pensando troppo.',
          'Sto caricando così lentamente che potresti prenderti una pausa per un caffè.',
          'Sono il loader. Non preoccuparti, non ho intenzione di prendere il controllo del tuo computer come in Matrix... ancora.',
          'Loading... come Neo che impara a padroneggiare la Matrice.',
          "Sto caricando con la velocità di un'escavatrice. Perché non mi chiami Loader-moto?",
          'Mi sento come Neo mentre cerca di evitare i proiettili... solo che sto evitando i blocchi di codice.',
        ],
        typeSpeed: 50,
        backDelay: 2000,
        showCursor: false,
        loop: true,
        shuffle: true,
      })

      return () => {
        // Destroy Typed instance during cleanup to stop animation
        typed.destroy()
      }
    }
  }, [isCreatingStory])

  const startStory = async (event: any) => {
    event.preventDefault()
    setIsCreatingStory(true)
    const word1 = document.getElementById('word1') as HTMLInputElement
    const word2 = document.getElementById('word2') as HTMLInputElement
    const word3 = document.getElementById('word3') as HTMLInputElement
    console.log(word1.value, word2.value, word3.value)
    const wordString = `${word1.value} ${word2.value} ${word3.value}`

    const response = await fetch(
      `http://localhost:8080/bonus/stream/adventure`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ message: wordString }),
      },
    )

    let fullStory = ''

    if (response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      setShowStory(true)
      setIsCreatingStory(false)

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        if (value) {
          try {
            const decodedString = decoder.decode(value).replace('data:', '')
            const json = JSON.parse(decodedString) as DataFromStream
            if (json?.choices[0]?.delta?.content) {
              setStory((prev) => prev + json.choices[0].delta.content)
              fullStory = fullStory + json.choices[0].delta.content
            }
          } catch (error) {
            console.error('Error parsing JSON: ', error)
          }
        }
        done = doneReading
      }
    }

    console.log('Response fully received')
    // replace the chat with the type adventure
    const newChats = chats.map((chat) => {
      if (chat.type === 'adventure') {
        console.log('adventureChat found: ', chat)
        console.log('adventureChat story: ', fullStory)
        return {
          ...chat,
          body: [
            {
              id: 0,
              question: '',
              answer: fullStory,
            },
          ],
        }
      }
      return chat
    })
    setChats(newChats)
    console.log('adventureChat created: ', chats)
  }

  const continueStory = async (event: any) => {
    event.preventDefault()
    const text = document.getElementById('text') as HTMLInputElement
    console.log(text.value)

    const response = await fetch(
      `http://localhost:8080/bonus/stream/adventure`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ message: text.value }),
      },
    )

    if (response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      if (adventureChat) {
        adventureChat.body.push({
          id: adventureChat.body.length,
          question: text.value,
          answer: '',
        })
      }
      // reset the text input
      text.value = ''

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        if (value) {
          try {
            const decodedString = decoder.decode(value).replace('data:', '')
            const json = JSON.parse(decodedString) as DataFromStream
            if (json?.choices[0]?.delta?.content) {
              // use setChats to update the adventureChat in the answer of the body
              setChats((prev) => {
                if (adventureChat) {
                  adventureChat.body[adventureChat.body.length - 1].answer +=
                    json.choices[0].delta.content
                }
                return [...prev]
              })
            }
          } catch (error) {
            console.error('Error parsing JSON: ', error)
          }
        }
        done = doneReading
      }
    }

    console.log('Response fully received')
    console.log('adventureChat: ', chats)
  }

  const leaveStory = (event: any) => {
    event.preventDefault()
    router.push('/chat')
    // reset in chats the chat with type adventure
    setTimeout(() => {
      const newChats = chats.map((chat) => {
        if (chat.type === 'adventure') {
          console.log('adventureChat found: ', chat)
          return {
            ...chat,
            body: [],
          }
        }
        return chat
      })
      setChats(newChats)
      setShowStory(false)
      setStory('')
      setShowInputs(true)
    }, 1000)
  }

  return (
    <>
      <MatrixRain />
      <div className="example flex flex-col justify-center items-center py-5">
        {isCreatingStory && (
          <div className="z-10 flex flex-col justify-center items-center gap-3">
            <p className="text-7xl text-white">
              {' '}
              Sto creando il tuo universo...
            </p>
            <Spinner />
            <p className="text-7xl text-white" ref={el2}></p>
          </div>
        )}
        {showStory && (
          // text area where to show the story
          <>
            <div className="z-10 text-area bg-gray-900 text-white p-4 my-8 max-h-[700px] overflow-y-auto">
              <p className="text-2xl">{story}</p>
            </div>
            {adventureChat?.body.map((chat) => (
              <div key={chat.id} className="z-10">
                {chat.question !== '' && (
                  <div className="text-area bg-black text-[#39FF14] p-4 my-8 w-[1100px] border border-white rounded-md">
                    <p className="text-2xl capitalize">{chat.question}</p>
                  </div>
                )}
                {chat.answer !== '' && chat.id !== 0 && (
                  <div className="text-area bg-[#2C3539] text-white p-4 my-8 w-[1100px] border border-[#39FF14] rounded-md">
                    <p className="text-2xl">{chat.answer}</p>
                  </div>
                )}
              </div>
            ))}
            {/* a single input and button to call continueStory */}
            <div className="flex z-10 w-full max-w-[1100px]">
              <form
                className="mb-4 flex flex-col w-full"
                onSubmit={continueStory}
              >
                <div className="flex flex-col md:flex-row justify-center items-center mb-4 w-full">
                  <input
                    className="bg-[#2C3539] text-[#39FF14] p-4 rounded-md w-full"
                    type="text"
                    id="text"
                    placeholder="Scegli il tuo destino"
                    autoComplete="off"
                  />
                  <button
                    className="bg-gray-900 btn primary text-white p-4 rounded-md"
                    type="submit"
                  >
                    Continua
                  </button>
                  <button className="btn tertiary" onClick={leaveStory}>
                    Esci
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {!showStory && !isCreatingStory && (
          <>
            <h1 className="z-10 font-bold text-8xl mb-4">Enter the Matrix</h1>
            <Image
              className="z-10"
              src="/elon2.png"
              alt="elon"
              width={500}
              height={500}
            />

            <div className="z-10 text-area bg-gray-900 text-white p-4 my-8">
              <p className="z-10 text-4xl" ref={el}></p>
            </div>
            {showInputs && (
              <div className="flex z-10">
                <form className="mb-4 flex flex-col" onSubmit={startStory}>
                  <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                    <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                      <input
                        type="text"
                        id="word1"
                        name="word1"
                        className="form-input mb-2 md:mb-0"
                        placeholder="Parola 1"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                      <input
                        type="text"
                        id="word2"
                        name="word2"
                        className="form-input mb-2 md:mb-0"
                        placeholder="Parola 2"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                      <input
                        type="text"
                        id="word3"
                        name="word3"
                        className="form-input mb-2 md:mb-0"
                        placeholder="Parola 3"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn primary">
                    Inizia
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default AdventureDescription
