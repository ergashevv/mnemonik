import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import data from '../datas/words/WordsData'

type StringSetter = (strings: string[] | ((strings: string[]) => string[])) => void

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void

interface IContext {
  words: string[]

  currentPageWords: number
  setCurrentPageWords: NumberSetter

  currentWords: string[]
  indexOfFirstWord: number
  indexOfLastWord: number

  answers: string[]
  setAnswers: StringSetter
  currentAnswers: string[]

  countDown: number
  setCountDown: NumberSetter
  minutesForRecall: number
  setMinutesForRecall: NumberSetter
  minutesForAnswer: number
  setMinutesForAnswer: NumberSetter

  cursorWidth: number
  setCursorWidth: NumberSetter
  highlightedWords: number
  setHighlightedWords: NumberSetter

  autoSecondWords: number
  setAutoSecondWords: NumberSetter
  navigationWords: string
  setNavigationWords: Function

  conditionNumber: number
  setConditionNumber: NumberSetter
}

const WordsContext = createContext<IContext>({} as IContext)

export const WordsContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [answers, setAnswers] = useState<string[]>(() => Array(200).fill(''))
  const [currentPageWords, setCurrentPageWords] = useState<number>(1)
  const [countDown, setCountDown] = useState<number>(5)
  const [minutesForRecall, setMinutesForRecall] = useState<number>(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState<number>(5)
  const [autoSecondWords, setAutoSecondWords] = useState<number>(1)
  const [conditionNumber, setConditionNumber] = useState<number>(10)

  const [navigationWords, setNavigationWords] = useState<string>(() =>
    JSON.parse(localStorage.getItem('navigationWords')!)
  )

  const [cursorWidth, setCursorWidth] = useState<number>(() =>
    JSON.parse(localStorage.getItem('cursorWidth')!)
  )

  const [highlightedWords, setHighlightedWords] = useState<number>(0)

  useEffect(() => {
    if (cursorWidth === 3 || cursorWidth === 4) {
      setConditionNumber(conditionNumber + 2)
    }
  }, [])

  useEffect(() => {
    if (cursorWidth) {
      localStorage.setItem('cursorWidth', JSON.stringify(cursorWidth))
    }
    if (navigationWords === 'auto') {
      localStorage.setItem('navigationWords', JSON.stringify(navigationWords))
    }
    if (navigationWords === 'custom') {
      localStorage.removeItem('navigationWords')
    }
  }, [cursorWidth, navigationWords])

  const indexOfLastWord = currentPageWords * conditionNumber
  const indexOfFirstWord = indexOfLastWord - conditionNumber

  const words = useMemo(
    () =>
      data
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 150),
    []
  )

  const currentWords = words?.slice(indexOfFirstWord, indexOfLastWord)
  const currentAnswers = answers?.slice(indexOfFirstWord, indexOfLastWord)

  const value = {
    words,
    answers,
    setAnswers,

    currentPageWords,
    setCurrentPageWords,

    currentWords,
    currentAnswers,

    indexOfFirstWord,
    indexOfLastWord,

    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
    minutesForAnswer,
    setMinutesForAnswer,
    cursorWidth,
    setCursorWidth,

    highlightedWords,
    setHighlightedWords,

    navigationWords,
    setNavigationWords,
    autoSecondWords,
    setAutoSecondWords,

    conditionNumber,
    setConditionNumber,
  }

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export const useWordsContext = () => useContext(WordsContext)
