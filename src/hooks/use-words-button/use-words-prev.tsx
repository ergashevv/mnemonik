import { useCallback, useEffect, useRef, useState } from 'react'
import { useWordsContext } from '../../context/words-context'

const useWordsPrev = () => {
  const {
    words,
    currentWords,
    cursorWidth,
    highlightedWords,
    setHighlightedWords,
    setCurrentPageWords,
    conditionNumber,
  } = useWordsContext()

  const [longPressHighlighted, setLongPressHighlighted] = useState(false)
  const [longPress, setLongPress] = useState(false)

  const intervalIdHighlighted = useRef<null | ReturnType<typeof setInterval>>(null)
  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (highlightedWords < 0) {
      if (currentWords.length === 6 && cursorWidth === 4) {
        setHighlightedWords(currentWords.length - cursorWidth + conditionNumber - 10)
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

        if (prevPage < 1) {
          prevPage = +(words.length / conditionNumber).toFixed()
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
    conditionNumber,
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

      if (prevPage < 1) {
        prevPage = +(words.length / conditionNumber).toFixed()
      }

      return prevPage
    })
  }, [cursorWidth, setCurrentPageWords, words.length, conditionNumber])

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
      onTouchEnd: () => setLongPressHighlighted(false),
    },

    wordsPrevButton: {
      onClick: prevPageWords,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useWordsPrev
