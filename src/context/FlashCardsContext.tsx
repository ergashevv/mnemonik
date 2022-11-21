import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void
type StringSetter = (strings: string | ((strings: string) => string)) => void

type NumberArraySetter = (numberArrays: number[] | ((numberArrays: number[]) => number[])) => void
type StringArraySetter = (strings: string[] | ((strings: string[]) => string[])) => void

interface IMajor {
  majorNumber: number
  majorObraz: string
}
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

  shuffledMajor: IMajor[]
  shuffledMillennium: any
  shuffledPao: any
  shuffledPoa: any
}

const FlashCardsContext = createContext<IContext>({} as IContext)

export const FlashCardsContextProvider = ({ children }: { children: ReactNode }) => {
  const [major, setMajor] = useState<string[]>(() => Array(100).fill(''))
  const [millennium, setMillennium] = useState<string[]>(() => Array(1000).fill(''))

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
  const [autoSecondFlashCards, setAutoSecondFlashCards] = useState<number>(() =>
    JSON.parse(localStorage.getItem('autoSecondFlashCards')!)
  )

  const [navigationFlashCards, setNavigationFlashCards] = useState<string>(() =>
    JSON.parse(localStorage.getItem('navigationFlashCards')!)
  )

  const [flashCardSections, setFlashCardSections] = useState<string>(() =>
    JSON.parse(localStorage.getItem('value')!)
  )
  const [hundreds, setHundreds] = useState<string>(() =>
    JSON.parse(localStorage.getItem('hundreds')!)
  )

  const [allMajor] = useState<IMajor[]>(() => JSON.parse(localStorage.getItem('allMajor')!))

  const [allMillennium] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('allMillennium')!)
  )
  const [pao] = useState<string[]>(() => JSON.parse(localStorage.getItem('pao')!))
  const [poa] = useState<string[]>(() => JSON.parse(localStorage.getItem('poa')!))

  useEffect(() => {
    if (allMillennium !== null) {
      allMillennium.slice(Number(hundreds), Number(hundreds) + 100)
    }
  }, [])

  function shuffle<T>(result: T[]): T[] {
    return result
      ?.map((value) => ({ value, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map(({ value }) => value)
  }


  const shuffledMajor: any = useMemo(() => shuffle(allMajor), [])
  const shuffledMillennium: any = useMemo(() => shuffle(allMillennium), [])
  const shuffledPao: any = useMemo(() => shuffle(pao), [])
  const shuffledPoa: any = useMemo(() => shuffle(poa), [])


  useEffect(() => {
    if (hundreds.length === 0) {
      setHundreds('0')
    }
    if (hundreds.length > 0) {
      localStorage.setItem('hundreds', JSON.stringify(hundreds))
    }
  }, [hundreds])

  useEffect(() => {
    if (flashCardSections.length === 0) {
      setFlashCardSections('major')
    }
    if (flashCardSections.length > 0) {
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

  useEffect(() => {
    if (autoSecondFlashCards >= 0) {
      localStorage.setItem('autoSecondFlashCards', JSON.stringify(autoSecondFlashCards))
    } else {
      localStorage.removeItem('autoSecondFlashCards')
    }
  })

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

    shuffledMajor,
    shuffledMillennium,
    shuffledPao,
    shuffledPoa,
  }

  return <FlashCardsContext.Provider value={value}>{children}</FlashCardsContext.Provider>
}

export const useFlashCardsContext = () => useContext(FlashCardsContext)
