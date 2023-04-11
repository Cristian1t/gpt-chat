'use client'

import MatrixRain from '@/components/matrixCodeRain'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'

const AdventureDescription = () => {
  const el = useRef(null)
  const [showInputs, setShowInputs] = useState(false)
  const [showStory, setShowStory] = useState(false)

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
  }, [])

  const startStory = () => {
    // check if valid and log the form values to the console for now
    const word1 = document.getElementById('word1') as HTMLInputElement
    const word2 = document.getElementById('word2') as HTMLInputElement
    const word3 = document.getElementById('word3') as HTMLInputElement
    console.log(word1.value, word2.value, word3.value)
    if (word1.value === '' || word2.value === '' || word3.value === '') {
      alert('Inserisci tutte le parole!')
      return
    }
    setShowStory(true)
  }

  return (
    <div className="example flex flex-col justify-center items-center">
      <MatrixRain />
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
