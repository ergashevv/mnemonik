import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import CardImg from '../assets/images/empty.png'
import { Cards } from '../datas/data-cards'
export interface Card {
  image: string
  id: number
}
export interface ICardsContext {
  line?: string
  focus?: number
  show?: string
  navigation?: string
  randomCard?: Card[]
  setShow: (show: string) => void
  inputs: Card[]
  setInputs: Function
  data: Card[]
  setData: Function
  setFocus: (focus: number) => void
  setRandomCard?: (randomCard: number[]) => void
  setNavigation: (navigation: string) => void
}
const CardsContext = createContext<ICardsContext>({} as ICardsContext)

export const CardsContextProvider = ({ children }: { children: ReactNode }) => {
  const [navigation, setNavigation] = useState(
    JSON.parse(localStorage.getItem('navigation')!)
  )

  const [data, setData] = useState<Card[]>(Cards)

  const [show, setShow] = useState<string>(
    JSON.parse(localStorage.getItem('show')!)
  )

  const [inputs, setInputs] = useState(
    Array(data.length).fill({ image: CardImg })
  )

  const [focus, setFocus] = useState(0)
  const [randomCard, setRandomCard] = useState<Card[]>([])
  useEffect(() => {
    if (navigation === 'left') {
      localStorage.setItem('navigation', JSON.stringify(navigation))
    }
    if (navigation === 'right') {
      localStorage.setItem('navigation', JSON.stringify(navigation))
    }
    if (show === 'small') {
      localStorage.setItem('show', JSON.stringify(show))
    }
    if (show === 'large') {
      localStorage.setItem('show', JSON.stringify(show))
    }
  }, [navigation, show])
  const shuffle = (arr: Card[]) => [...arr].sort(() => Math.random() - 0.5)
  useEffect(() => {
    setRandomCard(shuffle(data))
  }, [setRandomCard, data])

  const value = {
    data,
    setData,
    inputs,
    setInputs,
    navigation,
    setNavigation,
    focus,
    setFocus,
    randomCard,
    setRandomcard: setRandomCard,
    show,
    setShow
  }
  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

export const useCardsContext = () => useContext(CardsContext)
