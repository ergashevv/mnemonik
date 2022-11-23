import { useCallback, useEffect, useRef, useState } from 'react'
import { useFlashCardsContext } from '../../context/flash-cards-context'

const useFlashCardsNext = () => {
  const {
    setCurrentFlashCard,
    shuffledPao,
    shuffledPoa,
    shuffledMajor,
    shuffledMillennium,
  } = useFlashCardsContext()

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

  const prevPageFlashCards = useCallback(() => {
    setCurrentFlashCard((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = 1
      }
      return prevPage
    })
  }, [variableArray?.length, setCurrentFlashCard])

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
