import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { imagesData } from "../datas/faces/FacesData"
import { firstNameData, lastNameData } from "../datas/names/NamesData"

type Gender = "male" | "female"

export interface PersonWithFirstName {
  gender: Gender
  firstName: string
}

export interface PersonWithLastName {
  gender: Gender
  lastName: string
}

interface PersonWithAll {
  img: string
  gender: Gender
  firstName: string
  lastName: string
}

interface Person {
  img: string
  firstName: string
  lastName: string
}

type NameSetter = (names: string[] | ((names: string[]) => string[])) => void

type NumberSetter = (numbers: number | ((numbers: number) => number)) => void

type PersonSetter = (
  person: Person[] | ((person: Person[]) => Person[])
) => void

interface Types {
  memorizationPeople: Person[]
  setMemorizationPeople: PersonSetter

  recallPeople: Person[]
  setRecallPeople: PersonSetter

  currentPageFaces: number
  setCurrentPageFaces: NumberSetter

  firstNames: string[]
  setFirstNames: NameSetter

  lastNames: string[]
  setLastNames: NameSetter

  results: Person[]
}

const FacesContext = createContext<Types>({} as Types)

export const FacesContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  const [memorizationPeople, setMemorizationPeople] = useState<Person[]>([])

  const [recallPeople, setRecallPeople] = useState<Person[]>([])

  const [currentPageFaces, setCurrentPageFaces] = useState<number>(1)

  const [firstNames, setFirstNames] = useState<string[]>(() =>
    Array(50).fill("")
  )

  const [lastNames, setLastNames] = useState<string[]>(() => Array(50).fill(""))

  const allPeople: PersonWithAll[] = []

  const results: Person[] = []

  let maleFirstNames: PersonWithFirstName[] = []
  let maleLastNames: PersonWithLastName[] = []

  let femaleFirstNames: PersonWithFirstName[] = []
  let femaleLastNames: PersonWithLastName[] = []

  function shuffle<T>(result: T[]): T[] {
    return result.sort(() => Math.random() - 0.5)
  }

  const shuffledImages = shuffle(imagesData).slice(0, 50)

  for (let i = 0; i < shuffledImages.length; i++) {
    if (shuffledImages[i].gender === "male") {
      maleFirstNames = firstNameData.filter((i) => i.gender === "male")
      maleLastNames = lastNameData.filter((i) => i.gender === "male")
    } else {
      femaleFirstNames = firstNameData.filter((i) => i.gender === "female")
      femaleLastNames = lastNameData.filter((i) => i.gender === "female")
    }

    const randomIndexOfFirstNames = Math.floor(
      Math.random() * (maleFirstNames.length | femaleFirstNames.length)
    )

    const randomIndexOfLastNames = Math.floor(
      Math.random() * (maleLastNames.length | femaleLastNames.length)
    )

    if (shuffledImages[i].gender === "male") {
      allPeople.push({
        gender: "male",
        img: shuffledImages[i]?.img,
        firstName: maleFirstNames[randomIndexOfFirstNames]?.firstName,
        lastName: maleLastNames[randomIndexOfLastNames]?.lastName,
      })
    } else {
      allPeople.push({
        gender: "female",
        img: shuffledImages[i]?.img,
        firstName: femaleFirstNames[randomIndexOfFirstNames]?.firstName,
        lastName: femaleLastNames[randomIndexOfLastNames]?.lastName,
      })
    }
  }

  const memorizationShuffle = shuffle(allPeople)
  const recallShuffle = shuffle(allPeople)

  // used in answers section
  for (let i = 0; i < recallPeople?.length; i++) {
    results.push({
      img: recallPeople[i]?.img,
      firstName: firstNames[i]?.trim(),
      lastName: lastNames[i]?.trim(),
    })
  }

  useEffect(() => {
    setMemorizationPeople(memorizationShuffle)
    setRecallPeople(recallShuffle)
  }, [])

  const value = {
    memorizationPeople,
    setMemorizationPeople,
    recallPeople,
    setRecallPeople,
    currentPageFaces,
    setCurrentPageFaces,
    firstNames,
    setFirstNames,
    lastNames,
    setLastNames,
    results,
  }

  return <FacesContext.Provider value={value}>{children}</FacesContext.Provider>
}

export const useFacesContext = () => useContext(FacesContext)
