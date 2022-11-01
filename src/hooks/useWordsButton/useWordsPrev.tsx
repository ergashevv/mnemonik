import { useCallback, useEffect, useRef, useState } from 'react'
import { useWordsContext } from '../../context/WordsContext'

const useWordsPrev = () => {
  const {
    words,
    wordsPerPage,
    currentWords,
    cursorWidth,
    highlightedWords,
    setHighlightedWords,
    setCurrentPageWords
  } = useWordsContext()

  const [longPressHighlighted, setLongPressHighlighted] = useState(false)
  const [longPress, setLongPress] = useState(false)

  const intervalIdHighlighted = useRef<null | ReturnType<typeof setInterval>>(
    null
  )
  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (highlightedWords < 0) {
      if (currentWords.length === 8) {
        setHighlightedWords(currentWords.length - cursorWidth + 1)
      } else {
        setHighlightedWords(currentWords.length - cursorWidth)
      }
    }
  }, [highlightedWords, currentWords.length, cursorWidth, setHighlightedWords])

  const prevHighlightedWords = useCallback(() => {
    setHighlightedWords((oldWords) => oldWords - cursorWidth)

    if (highlightedWords - cursorWidth < 0) {
      setCurrentPageWords((oldPage) => {
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
    highlightedWords,
    cursorWidth,
    setHighlightedWords,
    setCurrentPageWords,
    words.length,
    wordsPerPage
  ])

  useEffect(() => {
    if (longPressHighlighted) {
      intervalIdHighlighted.current = setInterval(prevHighlightedWords, 150)
    } else {
      clearInterval(Number(intervalIdHighlighted.current))
    }

    return () => {
      clearInterval(Number(intervalIdHighlighted.current))
    }
  }, [longPressHighlighted, prevHighlightedWords])

  /// /////////////////////////////////////////////////////////////////////////////////////

  const prevPageWords = useCallback(() => {
    setCurrentPageWords((oldPage) => {
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
  }, [cursorWidth, setCurrentPageWords, words.length, wordsPerPage])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(prevPageWords, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [longPress, prevPageWords])

  return {
    prevHighlightedButton: {
      onClick: prevHighlightedWords,
      onMouseDown: () => setLongPressHighlighted(true),
      onMouseUp: () => setLongPressHighlighted(false),
      onMouseLeave: () => setLongPressHighlighted(false),
      onTouchStart: () => setLongPressHighlighted(true),
      onTouchEnd: () => setLongPressHighlighted(false)
    },

    wordsPrevButton: {
      onClick: prevPageWords,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false)
    }
  }
}

export default useWordsPrev
