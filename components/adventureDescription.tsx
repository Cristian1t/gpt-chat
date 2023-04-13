'use client'
import MatrixRain from '@/components/matrixCodeRain'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import Typed from 'typed.js'

// interface DataFromStream {
//   id: string
//   object: string
//   created: number
//   model: string
//   choices: [
//     {
//       delta: {
//         content: string
//       }
//       index: number
//       finish_reason: string
//     },
//   ]
// }

interface DataFromAdventure {
  context: string
  message: string
  role: string
}

const AdventureDescription = () => {
  const el = useRef(null)
  const [showInputs, setShowInputs] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [story, setStory] = useState('')

  useEffect(() => {
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
      typeSpeed: 1,
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
  }, [])

  const startStory = async (event: any) => {
    event.preventDefault()
    // check if valid and log the form values to the console for now
    const word1 = document.getElementById('word1') as HTMLInputElement
    const word2 = document.getElementById('word2') as HTMLInputElement
    const word3 = document.getElementById('word3') as HTMLInputElement
    console.log(word1.value, word2.value, word3.value)
    // if (word1.value === '' || word2.value === '' || word3.value === '') {
    //   alert('Inserisci tutte le parole!')
    //   return
    // }
    const wordString = `${word1.value} ${word2.value} ${word3.value}`
    // await fetch('/bonus/adventure', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message: wordString }),
    // }).then((res) => {
    //   const data = res.json().then(async (data: DataFromAdventure) => {
    //     console.log(data)
    //     await callForLastAdventure(data.context)
    //   })
    // })

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

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        if (value) {
          try {
            const decodedString = decoder.decode(value).replace('data:', '')
            const json = JSON.parse(decodedString)
            console.log('json: ', json)
            fullStory += decodedString
            if (json?.choices[0]?.delta?.content) {
              setStory((prev) => prev + json.choices[0].delta.content)
            }
          } catch (error) {
            console.error('Error parsing JSON: ', error)
          }
        }
        done = doneReading
      }
    }

    console.log('Response fully received')
    console.log('fullStory: ', fullStory)

    // const source = new EventSource(
    //   `http://localhost:8080/bonus/text/adventure/${wordString}`,
    // )
    // source.onmessage = (event) => {
    //   const data = JSON.parse(event.data) as DataFromStream
    //   console.log(data?.choices[0]?.delta?.content)
    //   if (data?.choices[0]?.delta?.content) {
    //     setStory((prev) => prev + data.choices[0].delta.content)
    //   }
    // }
    // source.onerror = (event) => {
    //   console.log('fullStory: ', story)
    //   console.log('error', event)
    //   source.close()
    // }
    // source.onopen = (event) => {
    //   console.log('open', event)
    // }
  }

  const generateStory = async (e: any) => {
    const word1 = document.getElementById('word1') as HTMLInputElement
    const word2 = document.getElementById('word2') as HTMLInputElement
    const word3 = document.getElementById('word3') as HTMLInputElement
    console.log(word1.value, word2.value, word3.value)
    // if (word1.value === '' || word2.value === '' || word3.value === '') {
    //   alert('Inserisci tutte le parole!')
    //   return
    // }
    const wordString = `${word1.value} ${word2.value} ${word3.value}`
    e.preventDefault()
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: wordString,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    console.log('data: ', data)
    if (!data) {
      return
    }
    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      console.log('chunkValue: ', chunkValue)
      setStory((prev) => prev + chunkValue)
    }

    setShowStory(true)
  }
  const callForLastAdventure = async (context: string) => {
    await fetch(`/bonus/adventure/last/${context}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      const data = res.json().then((data) => {
        if (data.message === 'BUSY') {
          setTimeout(() => {
            // callForLastAdventure(context)
          }, 10000)
        }
        console.log(data)
        setStory(data.message)
      })
    })
  }

  const continueStory = async () => {
    await fetch(`/bonus/adventure/last`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      const data = res.json().then((data) => {
        if (data.message === 'BUSY') {
          setTimeout(() => {
            // callForLastAdventure(context)
          }, 10000)
        }
        console.log(data)
        setStory(data.message)
      })
    })
  }

  return (
    <div className="example flex flex-col justify-center items-center">
      <MatrixRain />
      {showStory && (
        // text area where to show the story
        <div className="z-10 text-area bg-gray-900 text-white p-4 my-8">
          <p className="text-2xl">{story}</p>
        </div>
      )}
      {!showStory && (
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
                    />
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                    <input
                      type="text"
                      id="word2"
                      name="word2"
                      className="form-input mb-2 md:mb-0"
                      placeholder="Parola 2"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row justify-center items-center mb-4">
                    <input
                      type="text"
                      id="word3"
                      name="word3"
                      className="form-input mb-2 md:mb-0"
                      placeholder="Parola 3"
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
  )
}

export default AdventureDescription
