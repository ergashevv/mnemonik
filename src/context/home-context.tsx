import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

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
  startTime: number
  setStartTime: (startTime: number) => void
  setCursorW: Function
  setLine: Function
  setNavigation: Function
  setAutoSecond: Function
  setResult: Function
}

const HomeContext = createContext<IContext>({} as IContext)

export const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [cursorW, setCursorW] = useState<string>(() =>
    JSON.parse(localStorage.getItem("cursorW")!)
  )
  const [line, setLine] = useState<string>(() =>
    JSON.parse(localStorage.getItem("line")!)
  )
  const [cursor, setCursor] = useState(0)
  const [result, setResult] = useState<string[]>()
  const [tab, setTab] = useState<number>(0)
  const [navigation, setNavigation] = useState<string>()
  const [autoSecond, setAutoSecond] = useState()
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  const [dynamic, setDynamic] = useState(200)
  console.log(dynamic)
  const [startTime, setStartTime] = useState<number>(5)

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
    if (cursorW) {
      localStorage.setItem("cursorW", JSON.stringify(cursorW))
    }

    if (line) {
      localStorage.setItem("line", JSON.stringify(line))
    }
  }, [cursorW, line])

  useEffect(() => {
    if (parseInt(cursorW!) === 3) {
      setDynamic(189)
    }
  }, [setDynamic, dynamic, cursorW])

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
  }

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}

export const useHomeContext = () => useContext(HomeContext)
