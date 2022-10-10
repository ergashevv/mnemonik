import { useEffect, useState } from 'react'
import { useFlashCardsContext } from '../../../context/FlashCardsContext'

const PrevPage = () => {
  const { setCurrentFlashCard, flashCards } = useFlashCardsContext()
  const [longPress, setLongPress] = useState(false)

  const prevPage = () => {
    setCurrentFlashCard((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = flashCards?.length
      }
      return prevPage
    })
  }

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPress) {
      timerId = setTimeout(prevPage, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [prevPage, longPress])

  return {
    prevHandlers: {
      onClick: prevPage,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default PrevPage
