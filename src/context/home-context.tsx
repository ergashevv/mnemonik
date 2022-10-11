import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
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
  autosec?: number
  randomNumbers: number[]
  dynum: number
  starttime: number
  setStartTime: (starttime: number) => void
  setCursorW: Function
  setLine: Function
  setNavigation: Function
  setAutosec: Function
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

  const [autosec, setAutosec] = useState()

  const [randomNumbers, setRandomNumbers] = useState<number[]>([])

  const [dynum, seTdynum] = useState(200)

  const [starttime, setStartTime] = useState<number>(5)
  console.log(starttime)

  useEffect(() => {
    setTimeout(
      () => setStartTime(starttime > 0 ? starttime - 1 : starttime),
      1000
    )
  }, [setStartTime, starttime])

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
      seTdynum(189)
    }
  }, [seTdynum, dynum, cursorW])

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
    dynum,
    seTdynum,
    line,
    setLine,
    navigation,
    setNavigation,
    autosec,
    setAutosec,
    starttime,
    setStartTime,
  }

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
}

export const useHomeContext = () => useContext(HomeContext)
