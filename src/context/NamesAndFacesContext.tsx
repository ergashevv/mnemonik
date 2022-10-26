import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { peopleImages } from "../datas/faces/FacesData"
import { firstName, lastName } from "../datas/names/NamesData"

interface PersonWithFirstName {
  gender: string
  firstName: string
}

interface PersonWithLastName {
  gender: string
  lastName: string
}

interface PersonWithAll {
  img: string
  gender: "male" | "female"
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

const NamesAndFacesContext = createContext<Types>({} as Types)

export const NamesAndFacesContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [memorizationPeople, setMemorizationPeople] = useState<Person[]>(
    () => []
  )

  const [recallPeople, setRecallPeople] = useState<Person[]>(() => [])

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

  const shuffledImages = useMemo(
    () =>
      peopleImages
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    []
  )

  for (let i = 0; i < shuffledImages.length; i++) {
    if (shuffledImages[i].gender === "male") {
      maleFirstNames = firstName.filter((i) => i.gender === "male")
      maleLastNames = lastName.filter((i) => i.gender === "male")
    } else {
      femaleFirstNames = firstName.filter((i) => i.gender === "female")
      femaleLastNames = lastName.filter((i) => i.gender === "female")
    }

    const randomIndexOfFirstNames = Math.floor(
      Math.random() * (maleFirstNames.length || femaleFirstNames.length)
    )

    const randomIndexOfLastNames = Math.floor(
      Math.random() * (maleLastNames.length || femaleLastNames.length)
    )

    if (shuffledImages[i].gender === "male") {
      allPeople.push({
        gender: "male",
        img: shuffledImages[i].img,
        firstName: maleFirstNames[randomIndexOfFirstNames].firstName,
        lastName: maleLastNames[randomIndexOfLastNames].lastName,
      })
    } else {
      allPeople.push({
        gender: "female",
        img: shuffledImages[i].img,
        firstName: femaleFirstNames[randomIndexOfFirstNames].firstName,
        lastName: femaleLastNames[randomIndexOfLastNames].lastName,
      })
    }
  }

  function shuffle(result: PersonWithAll[]) {
    return result
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 50)
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

  return (
    <NamesAndFacesContext.Provider value={value}>
      {children}
    </NamesAndFacesContext.Provider>
  )
}

export const useNamesAndFacesContext = () => useContext(NamesAndFacesContext)
