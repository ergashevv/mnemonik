import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void
type StringSetter = (strings: string | ((strings: string) => string)) => void

type NumberArraySetter = (numberArrays: number[] | ((numberArrays: number[]) => number[])) => void
type StringArraySetter = (strings: string[] | ((strings: string[]) => string[])) => void
interface IContext {
  currentFlashCard: number
  setCurrentFlashCard: NumberSetter
  countDown: number
  setCountDown: NumberSetter

  timeMajor: number[]
  setTimeMajor: NumberArraySetter
  timeMillennium: number[]
  setTimeMillennium: NumberArraySetter
  timePoa: number[]
  setTimePoa: NumberArraySetter
  timePao: number[]
  setTimePao: NumberArraySetter

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

  majorNumbers: number[]
  setMajorNumbers: NumberArraySetter
  millenniumNumbers: number[]
  setMillenniumNumbers: NumberArraySetter
  poaNumbers: number[]
  setPoaNumbers: NumberArraySetter
  paoNumbers: number[]
  setPaoNumbers: NumberArraySetter

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

  shuffledMajor: any
  shuffledMillennium: any
  shuffledPao: any
  shuffledPoa: any
}

const FlashCardsContext = createContext<IContext>({} as IContext)

export const FlashCardsContextProvider = ({ children }: { children: ReactNode }) => {
  const hundredNumbers = JSON.parse(localStorage.getItem('hundreds')!)

  const [major, setMajor] = useState<string[]>(() => Array(100).fill(''))
  const [majorNumbers, setMajorNumbers] = useState<number[]>(() =>
    Array(100)
      .fill(null)
      .map((_, index) => index)
  )

  const [millennium, setMillennium] = useState<string[]>(() => Array(1000).fill(''))
  const [millenniumNumbers, setMillenniumNumbers] = useState<number[]>(() =>
    Array(1000)
      .fill(null)
      .map((_, index) => index)
  )

  const [poaPerson, setPoaPerson] = useState<string[]>(() => Array(100).fill(''))
  const [poaObject, setPoaObject] = useState<string[]>(() => Array(100).fill(''))
  const [poaAction, setPoaAction] = useState<string[]>(() => Array(100).fill(''))
  const [poaNumbers, setPoaNumbers] = useState<number[]>(() =>
    Array(100)
      .fill(null)
      .map((_, index) => index)
  )

  const [paoPerson, setPaoPerson] = useState<string[]>(() => Array(100).fill(''))
  const [paoObject, setPaoObject] = useState<string[]>(() => Array(100).fill(''))
  const [paoAction, setPaoAction] = useState<string[]>(() => Array(100).fill(''))
  const [paoNumbers, setPaoNumbers] = useState<number[]>(() =>
    Array(100)
      .fill(null)
      .map((_, index) => index)
  )

  const [currentFlashCard, setCurrentFlashCard] = useState<number>(1)
  const [countDown, setCountDown] = useState<number>(5)
  const [timeMajor, setTimeMajor] = useState<number[]>(() => Array(100).fill(0))
  const [timeMillennium, setTimeMillennium] = useState<number[]>(() => Array(100).fill(0))
  const [timePoa, setTimePoa] = useState<number[]>(() => Array(100).fill(0))
  const [timePao, setTimePao] = useState<number[]>(() => Array(100).fill(0))
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
  const [allMajor] = useState(JSON.parse(localStorage.getItem('allMajor')!))
  const [allMillennium] = useState(JSON.parse(localStorage.getItem('allMillennium')!))
  const [pao] = useState(JSON.parse(localStorage.getItem('pao')!))
  const [poa] = useState(JSON.parse(localStorage.getItem('poa')!))

  console.log(allMillennium, 'allMillennium')

  let slicedMillennium: [] = []

  if (allMillennium !== null) {
    slicedMillennium = allMillennium.slice(Number(hundredNumbers), Number(hundredNumbers) + 100)
  }

  function shuffle<T>(result: T[]): T[] {
    return result
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  const shuffledMajor = useMemo(() => shuffle(allMajor), [])
  const shuffledMillennium = useMemo(() => shuffle(slicedMillennium), [])
  const shuffledPao = useMemo(() => shuffle(pao), [])
  const shuffledPoa = useMemo(() => shuffle(poa), [])

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

    timeMajor,
    setTimeMajor,
    timeMillennium,
    setTimeMillennium,
    timePoa,
    setTimePoa,
    timePao,
    setTimePao,

    majorNumbers,
    setMajorNumbers,
    millenniumNumbers,
    setMillenniumNumbers,
    poaNumbers,
    setPoaNumbers,
    paoNumbers,
    setPaoNumbers,

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

    shuffledMajor,
    shuffledMillennium,
    shuffledPao,
    shuffledPoa,
  }

  return <FlashCardsContext.Provider value={value}>{children}</FlashCardsContext.Provider>
}

export const useFlashCardsContext = () => useContext(FlashCardsContext)
