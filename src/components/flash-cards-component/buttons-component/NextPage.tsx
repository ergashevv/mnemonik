import { useEffect, useState } from 'react'
import { useFlashCardsContext } from '../../../context/FlashCardsContext'

const NextPage = () => {
  const { setCurrentFlashCard, flashCards } = useFlashCardsContext()
  const [longPress, setLongPress] = useState(false)

  const nextPage = () => {
    setCurrentFlashCard((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > flashCards?.length - 1) {
        nextPage = 1
      }
      return nextPage
    })
  }

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPress) {
      timerId = setTimeout(nextPage, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [nextPage, longPress])

  return {
    nextHandlers: {
      onClick: nextPage,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default NextPage
