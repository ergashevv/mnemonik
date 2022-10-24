import { useCallback, useEffect, useRef, useState } from "react"
import { useFlashCardsContext } from "../../context/FlashCardsContext"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"

const PrevPage = () => {
  const { people, setCurrentPage } = useNamesAndFacesContext()
  const {
    words,
    wordsPerPage,
    currentWords,
    cursorWidth,
    activeWords,
    setActiveWords,
  } = useWordsContext()
  const { flashCards } = useFlashCardsContext()

  const [longPress, setLongPress] = useState(false)
  const [longPress2, setLongPress2] = useState(false)
  const [longPress3, setLongPress3] = useState(false)
  const [longPress4, setLongPress4] = useState(false)

  const prevPage = useCallback(() => {
    setCurrentPage((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = people?.length
      }
      return prevPage
    })
  }, [people?.length, setCurrentPage])
  useEffect(() => {
    if (activeWords < 0) {
      setActiveWords(currentWords.length - cursorWidth)
    }
  }, [activeWords, currentWords.length, cursorWidth, setActiveWords])
  const prevPageWords = useCallback(() => {
    setActiveWords((oldActiveWords) => oldActiveWords - cursorWidth)
    if (activeWords - cursorWidth < 0) {
      setCurrentPage((oldPage) => {
        let prevPage = oldPage - 1

        if (cursorWidth === 3 || cursorWidth === 4) {
          if (prevPage < 1) {
            prevPage = +(words.length / (wordsPerPage + 2)).toFixed()
          }
        }

        if (prevPage < 1) {
          prevPage = words.length / wordsPerPage
        }

        return prevPage
      })
    }
  }, [
    activeWords,
    cursorWidth,
    setActiveWords,
    setCurrentPage,
    words.length,
    wordsPerPage,
  ])

  const prevPageWords2 = useCallback(() => {
    setCurrentPage((oldPage) => {
      let prevPage = oldPage - 1

      if (cursorWidth === 3 || cursorWidth === 4) {
        if (prevPage < 1) {
          prevPage = +(words.length / (wordsPerPage + 2)).toFixed()
        }
      }

      if (prevPage < 1) {
        prevPage = words.length / wordsPerPage
      }

      return prevPage
    })
  }, [cursorWidth, setCurrentPage, words.length, wordsPerPage])

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
  let intervalId4 = useRef<null | ReturnType<typeof setInterval>>(null)

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

  useEffect(() => {
    if (longPress4) {
      intervalId4.current = setInterval(prevPageWords2, 150)
    } else {
      clearInterval(Number(intervalId4.current))
    }

    return () => {
      clearInterval(Number(intervalId4.current))
    }
  }, [longPress4, prevPageWords2])

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

    prevHandlersWords2: {
      onClick: prevPageWords2,
      onMouseDown: () => setLongPress4(true),
      onMouseUp: () => setLongPress4(false),
      onMouseLeave: () => setLongPress4(false),
      onTouchStart: () => setLongPress4(true),
      onTouchEnd: () => setLongPress4(false),
    },
  }
}

export default PrevPage
