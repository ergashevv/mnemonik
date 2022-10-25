import { useCallback, useEffect, useRef, useState } from "react"
import { useFlashCardsContext } from "../../context/FlashCardsContext"

const useFlashCardsNext = () => {
  const { flashCards, setCurrentFlashCard } = useFlashCardsContext()

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

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [nextPageFlashCards, longPress])

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
