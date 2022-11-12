import { useCallback, useEffect, useRef, useState } from 'react'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

const useFlashCardsNext = () => {
  // const [major] = useState(JSON.parse(localStorage.getItem('major')!))

  const { setCurrentFlashCard, major } = useFlashCardsContext()

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const prevPageFlashCards = useCallback(() => {
    setCurrentFlashCard((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = major?.length
      }
      return prevPage
    })
  }, [major?.length, setCurrentFlashCard])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(prevPageFlashCards, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [prevPageFlashCards, longPress])

  return {
    flashCardsPrevButton: {
      onClick: prevPageFlashCards,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useFlashCardsNext
