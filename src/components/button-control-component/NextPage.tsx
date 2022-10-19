import { useCallback, useEffect, useRef, useState } from "react"
import { useFlashCardsContext } from "../../context/FlashCardsContext"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"

const NextPage = () => {
  const { people, setCurrentPage } = useNamesAndFacesContext()
  const { words, wordsPerPage } = useWordsContext()
  const { flashCards } = useFlashCardsContext()
  const { setCursor, cursor } = useHomeContext()

  const [longPress, setLongPress] = useState(false)
  const [longPress2, setLongPress2] = useState(false)
  const [longPress3, setLongPress3] = useState(false)

  const nextPage = useCallback(() => {
    setCurrentPage((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length) {
        nextPage = 1
      }
      return nextPage
    })
  }, [people?.length, setCurrentPage])

  const nextPageWords = useCallback(() => {
    setCursor((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }, [setCursor, words?.length, wordsPerPage])

  const nextPageCards = useCallback(() => {
    setCurrentPage((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > flashCards?.length) {
        nextPage = 1
      }
      return nextPage
    })
  }, [flashCards?.length, setCurrentPage])

  let intervalId = useRef<null | ReturnType<typeof setInterval>>(null)
  let intervalId2 = useRef<null | ReturnType<typeof setInterval>>(null)
  let intervalId3 = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(nextPage, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [nextPage, longPress])

  useEffect(() => {
    if (longPress2) {
      intervalId2.current = setInterval(nextPageWords, 150)
    } else {
      clearInterval(Number(intervalId2.current))
    }

    return () => {
      clearInterval(Number(intervalId2.current))
    }
  }, [longPress2, nextPageWords])

  useEffect(() => {
    if (longPress3) {
      intervalId3.current = setInterval(nextPageCards, 150)
    } else {
      clearInterval(Number(intervalId3.current))
    }

    return () => {
      clearInterval(Number(intervalId3.current))
    }
  }, [nextPageCards, longPress3])

  return {
    nextHandlers: {
      onClick: nextPage,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },

    nextHandlersWords: {
      onClick: nextPageWords,
      onMouseDown: () => setLongPress2(true),
      onMouseUp: () => setLongPress2(false),
      onMouseLeave: () => setLongPress2(false),
      onTouchStart: () => setLongPress2(true),
      onTouchEnd: () => setLongPress2(false),
    },

    nextHandlersCards: {
      onClick: nextPageCards,
      onMouseDown: () => setLongPress3(true),
      onMouseUp: () => setLongPress3(false),
      onMouseLeave: () => setLongPress3(false),
      onTouchStart: () => setLongPress3(true),
      onTouchEnd: () => setLongPress3(false),
    },
  }
}
export default NextPage
