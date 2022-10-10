import { useEffect, useState } from 'react'
import { useWordsContext } from '../../../context/WordsContext'


const NextPage = () => {
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

  const nextPageRecall = () => {
    setCurrentPageRecall((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const nextPageAnswers = () => {
    setCurrentPageAnswers((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const nextPageResults = () => {
    setCurrentPageResults((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPressRecall) {
      timerId = setTimeout(nextPageRecall, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [nextPageRecall, longPressRecall])

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPressAnswers) {
      timerId = setTimeout(nextPageAnswers, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [nextPageAnswers, longPressAnswers])

  useEffect(() => {
    let timerId: null | ReturnType<typeof setTimeout> = null
    if (longPressResults) {
      timerId = setTimeout(nextPageResults, 150)
    } else {
      clearTimeout(Number(timerId))
    }

    return () => {
      clearTimeout(Number(timerId))
    }
  }, [nextPageResults, longPressResults])

  return {
    nextRecallHandlers: {
      onClick: nextPageRecall,
      onMouseDown: () => setLongPressRecall(true),
      onMouseUp: () => setLongPressRecall(false),
      onMouseLeave: () => setLongPressRecall(false),
      onTouchStart: () => setLongPressRecall(true),
      onTouchEnd: () => setLongPressRecall(false),
    },

    nextAnswersHandlers: {
      onClick: nextPageAnswers,
      onMouseDown: () => setLongPressAnswers(true),
      onMouseUp: () => setLongPressAnswers(false),
      onMouseLeave: () => setLongPressAnswers(false),
      onTouchStart: () => setLongPressAnswers(true),
      onTouchEnd: () => setLongPressAnswers(false),
    },

    nextResultsHandlers: {
      onClick: nextPageResults,
      onMouseDown: () => setLongPressResults(true),
      onMouseUp: () => setLongPressResults(false),
      onMouseLeave: () => setLongPressResults(false),
      onTouchStart: () => setLongPressResults(true),
      onTouchEnd: () => setLongPressResults(false),
    },
  }
}

export default NextPage
