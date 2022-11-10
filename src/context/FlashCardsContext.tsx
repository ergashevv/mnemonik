import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void
type StringSetter = (strings: string | ((strings: string) => string)) => void

type NumberArraySetter = (numberArrays: number[] | ((numberArrays: number[]) => number[])) => void
type StringArraySetter = (strings: string[] | ((strings: string[]) => string[])) => void
interface IContext {
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

  major: string[]
  setMajor: StringArraySetter
  millennium: string[]
  setMillennium: StringArraySetter
  poaPerson: string[]
  setPoaPerson: StringArraySetter
  poaObject: string[]
  setPoaObject: StringArraySetter
  poaAction: string[]
  setPoaAction: StringArraySetter

  paoPerson: string[]
  setPaoPerson: StringArraySetter
  paoObject: string[]
  setPaoObject: StringArraySetter
  paoAction: string[]
  setPaoAction: StringArraySetter

  flashCardSections: string
  setFlashCardSections: StringSetter
  hundreds: string
  setHundreds: StringSetter

  hundredNumbers: string
}

const FlashCardsContext = createContext<IContext>({} as IContext)

export const FlashCardsContextProvider = ({ children }: { children: ReactNode }) => {
  const hundredNumbers = JSON.parse(localStorage.getItem('hundreds')!)

  const [major, setMajor] = useState<string[]>(() => Array(100).fill(''))
  const [millennium, setMillennium] = useState<string[]>(() => Array(1000).fill(''))

  const [poaPerson, setPoaPerson] = useState<string[]>(() => Array(100).fill(''))
  const [poaObject, setPoaObject] = useState<string[]>(() => Array(100).fill(''))
  const [poaAction, setPoaAction] = useState<string[]>(() => Array(100).fill(''))

  const [paoPerson, setPaoPerson] = useState<string[]>(() => Array(100).fill(''))
  const [paoObject, setPaoObject] = useState<string[]>(() => Array(100).fill(''))
  const [paoAction, setPaoAction] = useState<string[]>(() => Array(100).fill(''))

  const [currentFlashCard, setCurrentFlashCard] = useState<number>(1)
  const [countDown, setCountDown] = useState<number>(5)
  const [time, setTime] = useState<number[]>(() => Array(100).fill(0))
  const [autoSecondFlashCards, setAutoSecondFlashCards] = useState<number>(1)

  const [navigationFlashCards, setNavigationFlashCards] = useState<string>(() =>
    JSON.parse(localStorage.getItem('navigationFlashCards')!)
  )

  const [flashCardSections, setFlashCardSections] = useState<string>(() =>
    JSON.parse(localStorage.getItem('value')!)
  )
  const [hundreds, setHundreds] = useState<string>(() =>
    JSON.parse(localStorage.getItem('hundreds')!)
  )

  useEffect(() => {
    if (!hundreds) {
      setHundreds('0')
    }
    if (hundreds) {
      localStorage.setItem('hundreds', JSON.stringify(hundreds))
    }
  }, [hundreds])

  useEffect(() => {
    if (!flashCardSections) {
      setFlashCardSections('major')
    }
    if (flashCardSections) {
      localStorage.setItem('value', JSON.stringify(flashCardSections))
    }
  }, [flashCardSections])

  useEffect(() => {
    if (navigationFlashCards === 'auto') {
      localStorage.setItem('navigationFlashCards', JSON.stringify(navigationFlashCards))
    }
    if (navigationFlashCards === 'custom') {
      localStorage.removeItem('navigationFlashCards')
    }
  }, [navigationFlashCards])

  const value = {
    currentFlashCard,
    setCurrentFlashCard,
    countDown,
    setCountDown,
    time,
    setTime,
    autoSecondFlashCards,
    setAutoSecondFlashCards,
    navigationFlashCards,
    setNavigationFlashCards,

    major,
    setMajor,
    millennium,
    setMillennium,
    poaPerson,
    setPoaPerson,
    poaObject,
    setPoaObject,
    poaAction,
    setPoaAction,
    paoPerson,
    setPaoPerson,
    paoObject,
    setPaoObject,
    paoAction,
    setPaoAction,

    flashCardSections,
    setFlashCardSections,

    hundreds,
    setHundreds,
    hundredNumbers,
  }

  return <FlashCardsContext.Provider value={value}>{children}</FlashCardsContext.Provider>
}

export const useFlashCardsContext = () => useContext(FlashCardsContext)
