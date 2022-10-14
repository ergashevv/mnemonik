import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { DatasDate, Events } from "../datas/data-dates"

export interface IDatesContext {
  line?: string
  focus?: number
  show?: boolean
  even: string[]
  userDate: string[]
  data: string[]
  setUserDate: Function
  setRandomCard?: (randomCard: number[]) => void
}

const DatesContext = createContext<IDatesContext>({} as IDatesContext)

export const DatesContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string[]>(DatasDate)
  const [even, setEven] = useState<string[]>(Events)
  const [userDate, setUserDate] = useState<string[]>(
    Array(data.length).fill("")
  )
  const [show, setShow] = useState<boolean>(false)
  const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5)

  useEffect(() => {
    setData(shuffle(DatasDate))
    setEven(shuffle(Events))
  }, [setData, setEven])

  const value = {
    data,
    setData,
    userDate,
    setUserDate,
    even,
    setEven,
    show,
    setShow,
  }

  return <DatesContext.Provider value={value}>{children}</DatesContext.Provider>
}

export const useDatedContext = () => useContext(DatesContext)
