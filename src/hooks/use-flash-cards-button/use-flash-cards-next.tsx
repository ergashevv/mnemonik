import { useCallback, useEffect, useRef, useState } from 'react'
import { useFlashCardsContext } from '../../context/flash-cards-context'
import { useHomeContext } from '../../context/home-context'

const useFlashCardsNext = () => {
  const {
    setCurrentFlashCard,
    navigationFlashCards,
    autoSecondFlashCards,
    shuffledMajor,
    shuffledMillennium,
    shuffledPao,
    shuffledPoa,
  } = useFlashCardsContext()
  const { startTime } = useHomeContext()

  const [value] = useState(() => JSON.parse(localStorage.getItem('value')!))
  const variableArray: any = []

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

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const nextPageFlashCards = useCallback(() => {
    setCurrentFlashCard((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > variableArray?.length) {
        nextPage = variableArray.length
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
      (window.location.hash === '#/flash-cards/major/memorization' ||
        window.location.hash === '#/flash-cards/millennium/memorization' ||
        window.location.hash === '#/flash-cards/poa/memorization' ||
        window.location.hash === '#/flash-cards/pao/memorization') &&
      Number(startTime) < 1
    ) {
      const timer = setInterval(() => {
        setCurrentFlashCard((oldPage: number) => {
          let nextPage = oldPage + 1
          if (nextPage > variableArray?.length) {
            nextPage = variableArray?.length
          }
          return nextPage
        })
      }, (Number(autoSecondFlashCards) / 10) * 1000)
      return () => clearInterval(timer)
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [nextPageFlashCards, longPress, autoSecondFlashCards, variableArray?.length, startTime])

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
