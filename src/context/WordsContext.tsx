import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import data from "../datas/words/WordsData"
import { useNamesAndFacesContext } from "./NamesAndFacesContext"

type StringSetter = (
  strings: string[] | ((strings: string[]) => string[])
) => void

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void

interface IContext {
  words: string[]
  setWords: StringSetter

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
  const { currentPage } = useNamesAndFacesContext()

  const [words, setWords] = useState<string[]>(data)
  const [answers, setAnswers] = useState<string[]>(() => Array(200).fill(""))
  const [wordsPerPage] = useState(10)
  const [countDown, setCountDown] = useState<number>(5)
  const [minutesForRecall, setMinutesForRecall] = useState<number>(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState<number>(5)

  const indexOfLastWord = currentPage * wordsPerPage
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
    answers,
    setAnswers,

    wordsPerPage,
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
  }

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export const useWordsContext = () => useContext(WordsContext)
