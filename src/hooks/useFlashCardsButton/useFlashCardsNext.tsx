import { useCallback, useEffect, useRef, useState } from 'react'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import { useHomeContext } from '../../context/home-context'

const useFlashCardsNext = () => {
  // const [major] = useState(JSON.parse(localStorage.getItem('major')!))

  const {
    setCurrentFlashCard,
    navigationFlashCards,
    autoSecondFlashCards,
    // major,
    shuffledMajor,
    shuffledMillennium,
    shuffledPao,
    shuffledPoa,
  } = useFlashCardsContext()
  const { startTime } = useHomeContext()

  const [value] = useState(() => JSON.parse(localStorage.getItem('value')!))
  const variableArray: any = []

  // console.log(value, 'value')
  // console.log(shuffledMillennium, 'shuffled')

  useEffect(() => {
    if (value === 'millennium') {
      variableArray.push(...shuffledMillennium)
    }
    if (value === 'major') {
      variableArray.push(...shuffledMajor)
    }
    if (value === 'poa') {
      variableArray.push(...shuffledPoa)
    }
    if (value === 'pao') {
      variableArray.push(...shuffledPao)
    }
  }, [variableArray])

  console.log(variableArray, 'varArr')

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const nextPageFlashCards = useCallback(() => {
    setCurrentFlashCard((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > variableArray?.length) {
        nextPage = 1
      }
      return nextPage
    })
  }, [variableArray?.length, setCurrentFlashCard])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(nextPageFlashCards, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    if (
      navigationFlashCards === 'auto' &&
      (window.location.pathname === '/flash-cards/major/memorization' ||
        window.location.pathname === '/flash-cards/millennium/memorization' ||
        window.location.pathname === '/flash-cards/poa/memorization' ||
        window.location.pathname === '/flash-cards/pao/memorization') &&
      Number(startTime) < 1
    ) {
      const timer = setInterval(() => {
        setCurrentFlashCard((oldPage: number) => {
          let nextPage = oldPage + 1
          if (nextPage > variableArray?.length) {
            nextPage = 1
          }
          return nextPage
        })
      }, (Number(autoSecondFlashCards) / 10) * 1000)
      return () => clearInterval(timer)
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [nextPageFlashCards, longPress, autoSecondFlashCards, variableArray.length, startTime])

  return {
    flashCardsNextButton: {
      onClick: nextPageFlashCards,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useFlashCardsNext
