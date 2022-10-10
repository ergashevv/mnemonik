import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { DatasDate, Events } from "../datas/data-dates"

// const DatedContext = React.createContext(false)
export interface IDatesContext {
  line?: string
  focus?: number
  show?: boolean
  even: string[]
  userdate: string[]
  data: string[]
  setUserdate: Function
  setRandomCard?: (randomcard: number[]) => void
}

const DatesContext = createContext<IDatesContext>({} as IDatesContext)

export const DatesContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string[]>(DatasDate)
  const [even, setEven] = useState<string[]>(Events)
  const [userdate, setUserdate] = useState<string[]>(
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
    userdate,
    setUserdate,
    even,
    setEven,
    show,
    setShow,
  }
  return <DatesContext.Provider value={value}>{children}</DatesContext.Provider>
}

export const useDatedContext = () => useContext(DatesContext)
