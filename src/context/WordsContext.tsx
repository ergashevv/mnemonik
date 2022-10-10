import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import data from '../datas/words/WordsData'

type StringSetter = (
  strings: string[] | ((strings: string[]) => string[]),
) => void

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void

interface IContext {
  words: string[]
  setWords: StringSetter
  currentPageRecall: number
  setCurrentPageRecall: NumberSetter
  currentPageAnswers: number
  setCurrentPageAnswers: NumberSetter
  currentPageResults: number
  setCurrentPageResults: NumberSetter

  wordsPerPage: number
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
}

const WordsContext = createContext<IContext>({} as IContext)

export const WordsContextProvider = ({ children }: { children: ReactNode }) => {
  const [words, setWords] = useState<string[]>(data)
  const [answers, setAnswers] = useState<string[]>(() => Array(200).fill(''))
  const [currentPageRecall, setCurrentPageRecall] = useState<number>(1)
  const [currentPageAnswers, setCurrentPageAnswers] = useState<number>(1)
  const [currentPageResults, setCurrentPageResults] = useState<number>(1)
  const [wordsPerPage] = useState(10)
  const [countDown, setCountDown] = useState<number>(5)
  const [minutesForRecall, setMinutesForRecall] = useState<number>(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState<number>(5)

  const indexOfLastWord = currentPageRecall * wordsPerPage
  const indexOfFirstWord = indexOfLastWord - wordsPerPage
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord)

  const currentAnswers = answers?.slice(indexOfFirstWord, indexOfLastWord)

  const shuffledWords = words
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 200)

  useEffect(() => {
    setWords(shuffledWords)
  }, [])

  const value = {
    words,
    setWords,

    currentPageRecall,
    setCurrentPageRecall,
    currentPageAnswers,
    setCurrentPageAnswers,
    currentPageResults,
    setCurrentPageResults,

    wordsPerPage,
    currentWords,
    indexOfFirstWord,
    indexOfLastWord,

    answers,
    setAnswers,
    currentAnswers,

    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
    minutesForAnswer,
    setMinutesForAnswer,
  }

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export const useWordsContext = () => useContext(WordsContext)
