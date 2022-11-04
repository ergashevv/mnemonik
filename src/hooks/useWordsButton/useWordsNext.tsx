import { useCallback, useEffect, useRef, useState } from 'react'
import { useHomeContext } from '../../context/home-context'
import { useWordsContext } from '../../context/WordsContext'

const useWordsNext = () => {
  const {
    words,
    wordsPerPage,
    currentWords,
    cursorWidth,
    highlightedWords,
    setHighlightedWords,
    setCurrentPageWords,
    navigationWords,
    autoSecondWords,
  } = useWordsContext()

  const { startTime } = useHomeContext()

  const [longPressHighlighted, setLongPressHighlighted] = useState(false)
  const [longPress, setLongPress] = useState(false)

  const intervalIdHighlighted = useRef<null | ReturnType<typeof setInterval>>(null)
  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const nextHighlightedWords = useCallback(() => {
    setHighlightedWords((oldActiveWords) => oldActiveWords + cursorWidth)
  }, [
    highlightedWords,
    currentWords.length,
    cursorWidth,
    setHighlightedWords,
    setCurrentPageWords,
    words.length,
    wordsPerPage,
  ])

  useEffect(() => {
    if (longPressHighlighted) {
      intervalIdHighlighted.current = setInterval(nextHighlightedWords, 150)
    } else {
      clearInterval(Number(intervalIdHighlighted.current))
    }

    if (
      navigationWords === 'auto' &&
      window.location.pathname === '/words/recall' &&
      Number(startTime) < 1
    ) {
      const timer = setInterval(() => {
        setHighlightedWords(highlightedWords + cursorWidth)
      }, (Number(autoSecondWords) / 10) * 1000)
      return () => clearInterval(timer)
    }

    return () => {
      clearInterval(Number(intervalIdHighlighted.current))
    }
  }, [longPressHighlighted, nextHighlightedWords, startTime])

  useEffect(() => {
    if (highlightedWords + cursorWidth > currentWords.length) {
      setCurrentPageWords((oldPage) => {
        let nextPage = oldPage + 1

        if (cursorWidth === 3 || cursorWidth === 4) {
          if (nextPage > +(words.length / (wordsPerPage + 2)).toFixed()) {
            nextPage = 1
          }
        }

        if (nextPage > words.length / wordsPerPage) {
          nextPage = 1
        }

        return nextPage
      })

      setHighlightedWords(0)
    }
  }, [nextHighlightedWords])

  const nextPageWords = useCallback(() => {
    setCurrentPageWords((oldPage: number) => {
      let nextPage = oldPage + 1
      if (cursorWidth === 3 || cursorWidth === 4) {
        if (nextPage > +(words.length / (wordsPerPage + 2)).toFixed()) {
          nextPage = 1
        }
      }

      if (nextPage > words.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }, [cursorWidth, setCurrentPageWords, words.length, wordsPerPage])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(nextPageWords, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [longPress, nextPageWords])

  return {
    nextHighlightedButton: {
      onClick: nextHighlightedWords,
      onMouseDown: () => setLongPressHighlighted(true),
      onMouseUp: () => setLongPressHighlighted(false),
      onMouseLeave: () => setLongPressHighlighted(false),
      onTouchStart: () => setLongPressHighlighted(true),
      onTouchEnd: () => setLongPressHighlighted(false),
    },

    wordsNextButton: {
      onClick: nextPageWords,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useWordsNext
