import { useCallback, useEffect, useRef, useState } from 'react'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import { useHomeContext } from '../../context/home-context'

const useFlashCardsNext = () => {
  const {
    flashCards,
    setCurrentFlashCard,
    navigationFlashCards,
    autoSecondFlashCards,
  } = useFlashCardsContext()
  const { startTime } = useHomeContext()

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const nextPageFlashCards = useCallback(() => {
    setCurrentFlashCard((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > flashCards?.length) {
        nextPage = 1
      }
      return nextPage
    })
  }, [flashCards?.length, setCurrentFlashCard])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(nextPageFlashCards, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    if (
      navigationFlashCards === 'auto' &&
      window.location.pathname === '/flash-cards/recall' &&
      Number(startTime) < 1
    ) {
      const timer = setInterval(() => {
        setCurrentFlashCard((oldPage: number) => {
          let nextPage = oldPage + 1
          if (nextPage > flashCards?.length) {
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
  }, [nextPageFlashCards, longPress, autoSecondFlashCards, flashCards.length, startTime])

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
