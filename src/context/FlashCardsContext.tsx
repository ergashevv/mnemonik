import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { flashCardsData } from '../datas/flash-cards/FlashCardsData'

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void

type NumberArraySetter = (numberArrays: number[] | ((numberArrays: number[]) => number[])) => void

interface FlashCards {
  number: string | number
  text: string
}

interface IContext {
  flashCards: FlashCards[]
  currentFlashCard: number
  setCurrentFlashCard: NumberSetter
  countDown: number
  setCountDown: NumberSetter
  time: number[]
  setTime: NumberArraySetter
  autoSecondFlashCards: number
  setAutoSecondFlashCards: NumberSetter
  navigationFlashCards: string
  setNavigationFlashCards: Function
}

const FlashCardsContext = createContext<IContext>({} as IContext)

export const FlashCardsContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentFlashCard, setCurrentFlashCard] = useState<number>(1)
  const [countDown, setCountDown] = useState<number>(5)
  const [time, setTime] = useState<number[]>(() => Array(100).fill(0))
  const [autoSecondFlashCards, setAutoSecondFlashCards] = useState<number>(1)

  const [navigationFlashCards, setNavigationFlashCards] = useState<string>(() =>
    JSON.parse(localStorage.getItem('navigationFlashCards')!)
  )

  useEffect(() => {
    if (navigationFlashCards === 'auto') {
      localStorage.setItem('navigationFlashCards', JSON.stringify(navigationFlashCards))
    }
    if (navigationFlashCards === 'custom') {
      localStorage.removeItem('navigationFlashCards')
    }
  }, [navigationFlashCards])

  const flashCards = useMemo(
    () =>
      flashCardsData
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    []
  )

  const value = {
    flashCards,
    currentFlashCard,
    setCurrentFlashCard,
    countDown,
    setCountDown,
    time,
    setTime,
    autoSecondFlashCards,
    setAutoSecondFlashCards,
    navigationFlashCards,
    setNavigationFlashCards
  }

  return <FlashCardsContext.Provider value={value}>{children}</FlashCardsContext.Provider>
}

export const useFlashCardsContext = () => useContext(FlashCardsContext)
