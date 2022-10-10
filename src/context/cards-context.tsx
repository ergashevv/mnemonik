import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react"
import { Cards } from "../datas/data-cards"
import CardImg from "../assets/images/empty.png"
export interface Card {
  image: string
  id: number
}
export interface ICardsContext {
  line?: string
  cursor: number
  cursorW?: string
  focus?: number
  setCursor: Function
  show?: string
  navigation?: string
  randomcard?: Card[]
  setShow: (show: string) => void
  inputs: Card[]
  setInputs: Function
  data: Card[]
  setFocus: (focus: number) => void
  setRandomCard?: (randomcard: number[]) => void
  setCursorW: (cursorW: string) => void
  setNavigation: (navigation: string) => void
}
const CardsContext = createContext<ICardsContext>({} as ICardsContext)

export const CardsContextProvider = ({ children }: { children: ReactNode }) => {
  const [cursorW, setCursorW] = useState<string>(() =>
    JSON.parse(localStorage.getItem("cursorW")!)
  )

  const [navigation, setNavigation] = useState(
    JSON.parse(localStorage.getItem("navigation")!)
  )

  const [cursor, setCursor] = useState(0)

  const [data, setData] = useState<Card[]>(Cards)

  const [show, setShow] = useState<string>(
    JSON.parse(localStorage.getItem("show")!)
  )

  const [inputs, setInputs] = useState(
    Array(data.length).fill({ image: CardImg })
  )

  const [focus, setFocus] = useState(0)

  const [randomcard, setRandomcard] = useState<Card[]>([])

  useEffect(() => {
    if (cursorW) {
      localStorage.setItem("cursorW", JSON.stringify(cursorW))
    }

    if (navigation === "left") {
      localStorage.setItem("navigation", JSON.stringify(navigation))
    }

    if (navigation === "right") {
      localStorage.setItem("navigation", JSON.stringify(navigation))
    }

    if (show === "small") {
      localStorage.setItem("show", JSON.stringify(show))
    }

    if (show === "large") {
      localStorage.setItem("show", JSON.stringify(show))
    }
  }, [cursorW, navigation, show])

  const shuffle = (arr: Card[]) => [...arr].sort(() => Math.random() - 0.5)
  

  useEffect(() => {
    setRandomcard(shuffle(data))
  }, [setRandomcard, data])

  const value = {
    cursorW,
    setCursorW,
    cursor,
    setCursor,
    data,
    setData,
    inputs,
    setInputs,
    navigation,
    setNavigation,
    focus,
    setFocus,
    randomcard,
    setRandomcard,
    show,
    setShow,
  }
  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

export const useCardsContext = () => useContext(CardsContext)
