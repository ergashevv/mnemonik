import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface IContext {
  numbers: string[]
  line?: string
  cursor: number
  cursorW?: string
  result?: string[]
  tab: number
  setTab: Function
  setCursor: Function
  navigation?: string
  autoSecond?: number
  randomNumbers: number[]
  dynamic: number
  setDynamic: Function
  startTime?: string
  setStartTime: (startTime: string) => void
  setCursorW: Function
  setLine: Function
  setNavigation: Function
  setToken: Function
  token: string
  setAutoSecond: Function
  setResult: Function
  timerForRecall: number
  setTimerForRecall: Function
  timerForAnswer: number
  setTimerForAnswer: Function
  user?: string[]
  setUser: Function
}

const HomeContext = createContext<IContext>({} as IContext)

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [cursorW, setCursorW] = useState<string>(() => JSON.parse(localStorage.getItem('cursorW')!))
  const [line, setLine] = useState<string>(() => JSON.parse(localStorage.getItem('line')!))
  const [navigation, setNavigation] = useState<string>(() =>
    JSON.parse(localStorage.getItem('navigation')!)
  )
  const [token, setToken] = useState<string>(() => JSON.parse(localStorage.getItem('token')!))
  const [startTime, setStartTime] = useState<string>(() =>
    JSON.parse(localStorage.getItem('startTime')!)
  )

  const [timerForRecall, setTimerForRecall] = useState<number>(5)
  const [timerForAnswer, setTimerForAnswer] = useState<number>(15)

  const [cursor, setCursor] = useState(0)
  const [user, setUser] = useState()
  const [result, setResult] = useState<string[]>()
  const [tab, setTab] = useState<number>(0)
  const [autoSecond, setAutoSecond] = useState(1)
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  const [dynamic, setDynamic] = useState(200)

  const shuffle = (arr: number[]) => [...arr].sort(() => Math.random() - 0.5)

  const [numbers, setNumbers] = useState<string[]>(() => {
    const numbers0to9 = Array(10)
      .fill(0)
      .map((_, i) => i.toString())

    const numbers760 = Array(76).fill(numbers0to9).flat()

    return numbers760
  })

  useEffect(() => {
    setRandomNumbers(shuffle(numbers.map((str) => Number(str))))
  }, [setRandomNumbers, numbers])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token))
    }
    if (cursorW) {
      localStorage.setItem('cursorW', JSON.stringify(cursorW))
    }

    if (line) {
      localStorage.setItem('line', JSON.stringify(line))
    }
    if (startTime) {
      localStorage.setItem('startTime', JSON.stringify(startTime))
    }
    if (navigation === 'auto') {
      localStorage.setItem('navigation', JSON.stringify(navigation))
    }
    if (navigation === 'custom') {
      localStorage.removeItem('navigation')
    }
    if (!cursorW) {
      setCursorW('2')
    }
    if (!line) {
      setLine('2')
    }
  }, [navigation, startTime])

  console.log(token)

  const value = {
    cursorW,
    setCursorW,
    numbers,
    setNumbers,
    cursor,
    setCursor,
    result,
    setResult,
    randomNumbers,
    setRandomNumbers,
    tab,
    setTab,
    dynamic,
    setDynamic,
    line,
    setLine,
    navigation,
    setNavigation,
    autoSecond,
    setAutoSecond,
    startTime,
    setStartTime,

    timerForRecall,
    setTimerForRecall,
    timerForAnswer,
    setTimerForAnswer,
    token,
    setToken,
    user,
    setUser,
  }

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}

export const useHomeContext = () => useContext(HomeContext)
