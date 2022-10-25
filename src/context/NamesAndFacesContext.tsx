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
  people: Person[]
  setPeople: PersonSetter

  shuffledPeople: Person[]
  setShuffledPeople: PersonSetter

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
  const [people, setPeople] = useState<Person[]>([])
  const [shuffledPeople, setShuffledPeople] = useState<Person[]>([])
  const [currentPageFaces, setCurrentPageFaces] = useState<number>(1)

  const [firstNames, setFirstNames] = useState<string[]>(() =>
    Array(50).fill("")
  )
  const [lastNames, setLastNames] = useState<string[]>(() => Array(50).fill(""))

  const result: PersonWithAll[] = []
  const results: Person[] = []
  let firstNameMale: PersonWithFirstName[] = []
  let firstNameFemale: PersonWithFirstName[] = []
  let lastNameMale: PersonWithLastName[] = []
  let lastNameFemale: PersonWithLastName[] = []

  for (let i = 0; i < peopleImages.length; i++) {
    if (peopleImages[i].gender === "male") {
      firstNameMale = firstName.filter((i) => i.gender === "male")
      lastNameMale = lastName.filter((i) => i.gender === "male")
    } else {
      firstNameFemale = firstName.filter((i) => i.gender === "female")
      lastNameFemale = lastName.filter((i) => i.gender === "female")
    }

    const randomIndexOfFirstNames = Math.floor(
      Math.random() * (firstNameMale.length || firstNameFemale.length)
    )

    const randomIndexOfLastNames = Math.floor(
      Math.random() * (lastNameMale.length || lastNameFemale.length)
    )

    if (peopleImages[i].gender === "male") {
      result.push({
        gender: "male",
        img: peopleImages[i].img,
        firstName: firstNameMale[randomIndexOfFirstNames].firstName,
        lastName: lastNameMale[randomIndexOfLastNames].lastName,
      })
    } else {
      result.push({
        gender: "female",
        img: peopleImages[i].img,
        firstName: firstNameFemale[randomIndexOfFirstNames].firstName,
        lastName: lastNameFemale[randomIndexOfLastNames].lastName,
      })
    }
  }

  const firstShuffle = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 50)

  const secondShuffle = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 50)

  // used in answers section
  for (let i = 0; i < shuffledPeople?.length; i++) {
    results.push({
      img: shuffledPeople[i]?.img,
      firstName: firstNames[i]?.trim(),
      lastName: lastNames[i]?.trim(),
    })
  }

  useEffect(() => {
    setPeople(firstShuffle)
    setShuffledPeople(secondShuffle)
  }, [])

  const value = {
    people,
    setPeople,
    setShuffledPeople,
    currentPageFaces,
    setCurrentPageFaces,
    firstNames,
    setFirstNames,
    lastNames,
    setLastNames,
    shuffledPeople,
    results,
  }

  return (
    <NamesAndFacesContext.Provider value={value}>
      {children}
    </NamesAndFacesContext.Provider>
  )
}

export const useNamesAndFacesContext = () => useContext(NamesAndFacesContext)
