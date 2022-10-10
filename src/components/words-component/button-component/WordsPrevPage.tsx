import { useEffect, useState } from 'react'
import { useWordsContext } from '../../../context/WordsContext'

const PrevPage = () => {
  const {
    words,
    wordsPerPage,
    setCurrentPageRecall,
    setCurrentPageAnswers,
    setCurrentPageResults,
  } = useWordsContext()

  const [longPressRecall, setLongPressRecall] = useState(false)
  const [longPressAnswers, setLongPressAnswers] = useState(false)
  const [longPressResults, setLongPressResults] = useState(false)

  const prevPageRecall = () => {
    setCurrentPageRecall((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }

  const prevPageAnswers = () => {
    setCurrentPageAnswers((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }

  const prevPageResults = () => {
    setCurrentPageResults((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPressRecall) {
      timerId = setTimeout(prevPageRecall, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [prevPageRecall, longPressRecall])

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPressAnswers) {
      timerId = setTimeout(prevPageAnswers, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [prevPageAnswers, longPressAnswers])

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPressResults) {
      timerId = setTimeout(prevPageResults, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [prevPageResults, longPressResults])

  return {
    prevRecallHandlers: {
      onClick: prevPageRecall,
      onMouseDown: () => setLongPressRecall(true),
      onMouseUp: () => setLongPressRecall(false),
      onMouseLeave: () => setLongPressRecall(false),
      onTouchStart: () => setLongPressRecall(true),
      onTouchEnd: () => setLongPressRecall(false),
    },

    prevAnswersHandlers: {
      onClick: prevPageAnswers,
      onMouseDown: () => setLongPressAnswers(true),
      onMouseUp: () => setLongPressAnswers(false),
      onMouseLeave: () => setLongPressAnswers(false),
      onTouchStart: () => setLongPressAnswers(true),
      onTouchEnd: () => setLongPressAnswers(false),
    },

    prevResultsHandlers: {
      onClick: prevPageResults,
      onMouseDown: () => setLongPressResults(true),
      onMouseUp: () => setLongPressResults(false),
      onMouseLeave: () => setLongPressResults(false),
      onTouchStart: () => setLongPressResults(true),
      onTouchEnd: () => setLongPressResults(false),
    },
  }
}

export default PrevPage
