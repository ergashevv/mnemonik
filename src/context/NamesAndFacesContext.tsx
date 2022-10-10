import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { peopleImages } from "../datas/faces/FacesData"
import { firstName, lastName } from "../datas/names/NamesData"

interface PersonWithGender {
  gender: string
  img: string
}

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
  currentPageRecall: number
  setCurrentPageRecall: NumberSetter
  currentPageAnswers: number
  setCurrentPageAnswers: NumberSetter
  currentPageResults: number
  setCurrentPageResults: NumberSetter
  countDown: number
  setCountDown: NumberSetter
  minutesForRecall: number
  setMinutesForRecall: NumberSetter
  minutesForAnswer: number
  setMinutesForAnswer: NumberSetter
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
  const [currentPageRecall, setCurrentPageRecall] = useState<number>(1)
  const [currentPageAnswers, setCurrentPageAnswers] = useState<number>(1)
  const [currentPageResults, setCurrentPageResults] = useState<number>(1)
  const [countDown, setCountDown] = useState<number>(5)
  const [minutesForRecall, setMinutesForRecall] = useState<number>(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState<number>(5)

  const [firstNames, setFirstNames] = useState<string[]>(() =>
    Array(50).fill("")
  )
  const [lastNames, setLastNames] = useState<string[]>(() => Array(50).fill(""))

  const maleImages: PersonWithGender[] = []
  const femaleImages: PersonWithGender[] = []
  const randomMaleImages: PersonWithGender[] = []
  const randomFemaleImages: PersonWithGender[] = []
  const result: PersonWithAll[] = []
  const results: Person[] = []
  let firstNameMale: PersonWithFirstName[] = []
  let firstNameFemale: PersonWithFirstName[] = []
  let lastNameMale: PersonWithLastName[] = []
  let lastNameFemale: PersonWithLastName[] = []

  for (let i = 0; i < peopleImages.length / 2; i++) {
    maleImages.push(peopleImages[i])
  }

  for (let i = peopleImages.length / 2; i < peopleImages.length; i++) {
    femaleImages.push(peopleImages[i])
  }

  for (let i = 0; i < maleImages.length; i++) {
    randomMaleImages.push(
      maleImages[Math.floor(Math.random() * maleImages.length)]
    )
  }

  for (let i = 0; i < femaleImages.length; i++) {
    randomFemaleImages.push(
      femaleImages[Math.floor(Math.random() * femaleImages.length)]
    )
  }

  let uniqueMaleImages = randomMaleImages.filter((el, index) => {
    return randomMaleImages.indexOf(el) === index
  })

  let uniqueFemaleImages = randomFemaleImages.filter((el, index) => {
    return randomFemaleImages.indexOf(el) === index
  })

  let uniqueLength = maleImages.length - uniqueMaleImages.length
  let allUniqueImages: PersonWithGender[] = []

  let filteredMaleImages = uniqueMaleImages.filter(
    (x) => !uniqueFemaleImages.includes(x)
  )
  let filteredFemaleImages = uniqueFemaleImages.filter(
    (x) => !uniqueMaleImages.includes(x)
  )

  if (uniqueMaleImages.length === randomMaleImages.length) {
    allUniqueImages = [...uniqueMaleImages]
  } else {
    allUniqueImages = [
      ...filteredMaleImages.concat(
        filteredFemaleImages?.slice(0, uniqueLength)
      ),
    ]
  }

  for (let i = 0; i < allUniqueImages.length; i++) {
    if (allUniqueImages[i].gender === "male") {
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

    if (allUniqueImages[i].gender === "male") {
      result.push({
        gender: "male",
        img: allUniqueImages[i].img,
        firstName: firstNameMale[randomIndexOfFirstNames].firstName,
        lastName: lastNameMale[randomIndexOfLastNames].lastName,
      })
    } else {
      result.push({
        gender: "female",
        img: allUniqueImages[i].img,
        firstName: firstNameFemale[randomIndexOfFirstNames].firstName,
        lastName: lastNameFemale[randomIndexOfLastNames].lastName,
      })
    }
  }

  let shuffled1 = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  let shuffled2 = result
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  for (let i = 0; i < shuffledPeople.length; i++) {
    results.push({
      img: shuffledPeople[i]?.img,
      firstName: firstNames[i].trim(),
      lastName: lastNames[i].trim(),
    })
  }

  useEffect(() => {
    setPeople(shuffled1)
    setShuffledPeople(shuffled2)
  }, [])

  const value = {
    people,
    setPeople,
    setShuffledPeople,
    currentPageRecall,
    setCurrentPageRecall,
    currentPageAnswers,
    setCurrentPageAnswers,
    currentPageResults,
    setCurrentPageResults,
    firstNames,
    setFirstNames,
    lastNames,
    setLastNames,
    shuffledPeople,
    results,
    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
    minutesForAnswer,
    setMinutesForAnswer,
  }

  return (
    <NamesAndFacesContext.Provider value={value}>
      {children}
    </NamesAndFacesContext.Provider>
  )
}

export const useNamesAndFacesContext = () => useContext(NamesAndFacesContext)
