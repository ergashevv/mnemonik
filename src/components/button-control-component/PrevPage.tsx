import { useCallback, useEffect, useRef, useState } from "react"
import { useFlashCardsContext } from "../../context/FlashCardsContext"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"

const PrevPage = () => {
  const { people, setCurrentPage } = useNamesAndFacesContext()
  const { words, wordsPerPage } = useWordsContext()
  const { flashCards } = useFlashCardsContext()

  const [longPress, setLongPress] = useState(false)
  const [longPress2, setLongPress2] = useState(false)
  const [longPress3, setLongPress3] = useState(false)

  const prevPage = useCallback(() => {
    setCurrentPage((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = people?.length
      }
      return prevPage
    })
  }, [people?.length, setCurrentPage])

  const prevPageWords = useCallback(() => {
    setCurrentPage((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }, [setCurrentPage, words?.length, wordsPerPage])

  const prevPageCards = useCallback(() => {
    setCurrentPage((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = flashCards?.length
      }
      return prevPage
    })
  }, [flashCards?.length, setCurrentPage])

  let intervalId = useRef<null | ReturnType<typeof setInterval>>(null)
  let intervalId2 = useRef<null | ReturnType<typeof setInterval>>(null)
  let intervalId3 = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(prevPage, 150)
    } else {
      clearTimeout(Number(intervalId.current))
    }

    return () => {
      clearTimeout(Number(intervalId.current))
    }
  }, [prevPage, longPress])

  useEffect(() => {
    if (longPress2) {
      intervalId2.current = setInterval(prevPageWords, 150)
    } else {
      clearTimeout(Number(intervalId2.current))
    }

    return () => {
      clearTimeout(Number(intervalId2.current))
    }
  }, [prevPageWords, longPress2])

  useEffect(() => {
    if (longPress3) {
      intervalId3.current = setInterval(prevPageCards, 150)
    } else {
      clearTimeout(Number(intervalId3.current))
    }

    return () => {
      clearTimeout(Number(intervalId3.current))
    }
  }, [prevPageCards, longPress3])

  return {
    prevHandlers: {
      onClick: prevPage,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },

    prevHandlersWords: {
      onClick: prevPageWords,
      onMouseDown: () => setLongPress2(true),
      onMouseUp: () => setLongPress2(false),
      onMouseLeave: () => setLongPress2(false),
      onTouchStart: () => setLongPress2(true),
      onTouchEnd: () => setLongPress2(false),
    },

    prevHandlersCards: {
      onClick: prevPageCards,
      onMouseDown: () => setLongPress3(true),
      onMouseUp: () => setLongPress3(false),
      onMouseLeave: () => setLongPress3(false),
      onTouchStart: () => setLongPress3(true),
      onTouchEnd: () => setLongPress3(false),
    },
  }
}

export default PrevPage
