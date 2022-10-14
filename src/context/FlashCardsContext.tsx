import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import { flashCardsData } from "../datas/flash-cards/FlashCardsData"

type FlashCardsSetter = (
  flashCards: FlashCards[] | ((flashCards: FlashCards[]) => FlashCards[])
) => void

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void

type NumberArraySetter = (
  numberArrays: number[] | ((numberArrays: number[]) => number[])
) => void

interface FlashCards {
  number: string | number
  text: string
}

interface IContext {
  flashCards: FlashCards[]
  setFlashCards: FlashCardsSetter
  currentFlashCard: number
  setCurrentFlashCard: NumberSetter
  countDown: number
  setCountDown: NumberSetter
  time: number[]
  setTime: NumberArraySetter
}

const FlashCardsContext = createContext<IContext>({} as IContext)

export const FlashCardsContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [flashCards, setFlashCards] = useState<FlashCards[]>(flashCardsData)
  const [currentFlashCard, setCurrentFlashCard] = useState<number>(1)
  const [countDown, setCountDown] = useState<number>(5)
  const [time, setTime] = useState<number[]>(() => Array(100).fill(0))

  let shuffled = flashCardsData
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  useEffect(() => {
    setFlashCards(shuffled)
  }, [])

  const value = {
    flashCards,
    setFlashCards,
    currentFlashCard,
    setCurrentFlashCard,
    countDown,
    setCountDown,
    time,
    setTime,
  }

  return (
    <FlashCardsContext.Provider value={value}>
      {children}
    </FlashCardsContext.Provider>
  )
}

export const useFlashCardsContext = () => useContext(FlashCardsContext)
