import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
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

  cursorWidth: number
  setCursorWidth: NumberSetter
  activeWords: number
  setActiveWords: NumberSetter
}

const WordsContext = createContext<IContext>({} as IContext)

export const WordsContextProvider = ({ children }: { children: ReactNode }) => {
  const { currentPage } = useNamesAndFacesContext()

  const [answers, setAnswers] = useState<string[]>(() => Array(200).fill(""))
  const [wordsPerPage] = useState(10)
  const [countDown, setCountDown] = useState<number>(5)
  const [minutesForRecall, setMinutesForRecall] = useState<number>(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState<number>(5)

  const [cursorWidth, setCursorWidth] = useState<number>(() =>
    JSON.parse(localStorage.getItem("cursorWidth")!)
  )

  const [activeWords, setActiveWords] = useState<number>(0)

  useEffect(() => {
    if (cursorWidth) {
      localStorage.setItem("cursorWidth", JSON.stringify(cursorWidth))
    }
  }, [cursorWidth])

  const indexOfLastWord =
    cursorWidth === 3 || cursorWidth === 4
      ? currentPage * (wordsPerPage + 2)
      : currentPage * wordsPerPage

  const indexOfFirstWord =
    cursorWidth === 3 || cursorWidth === 4
      ? indexOfLastWord - (wordsPerPage + 2)
      : indexOfLastWord - wordsPerPage

  const words = useMemo(
    () =>
      data
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        .slice(0, 200),
    []
  )

  const currentWords = words?.slice(indexOfFirstWord, indexOfLastWord)

  const currentAnswers = answers?.slice(indexOfFirstWord, indexOfLastWord)

  const value = {
    words,
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
    cursorWidth,
    setCursorWidth,

    activeWords,
    setActiveWords,
  }

  return <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
}

export const useWordsContext = () => useContext(WordsContext)
