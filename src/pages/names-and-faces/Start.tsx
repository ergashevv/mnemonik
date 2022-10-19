import { ChangeEvent, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const blobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const Start = () => {
  const [imagesLoading, setImagesLoading] = useState<boolean>(false)
  const { setStartTime } = useHomeContext()
  const {
    people,
    setPeople,
    setShuffledPeople,
    setCurrentPage
  } = useNamesAndFacesContext()

  const [imagesFetched, setImagesFetched] = useState<number>(0)

  const navigate = useNavigate()

  const handleNavigate = useCallback(async () => {
    setImagesLoading(true)

    const updatedPeople = await Promise.all(
      people.map(async ({ img, ...person }) => {
        const res = await fetch(img)

        const blob = await res.blob()

        const url = (await blobToBase64(blob)) as string

        setImagesFetched((fetched) => fetched + 1)

        return { ...person, img: url }
      })

    )

    setShuffledPeople((shuffledPeople) =>
      shuffledPeople.map((person) => {
        const { img } = updatedPeople.find(
          (updatedPerson) =>
            person.firstName === updatedPerson.firstName &&
            person.lastName === updatedPerson.lastName
        )!

        return { ...person, img }
      })
    )

    setPeople(updatedPeople)

    navigate("/names-and-faces/recall")
    setCurrentPage(1)
  }, [navigate, people, setCurrentPage, setPeople, setShuffledPeople])

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }
  
  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
          <input
            type="number"
            onChange={handleStartTime}
            placeholder="Standart vaqt 5 soniya"
          />

          <button
            type="submit"
            onClick={handleNavigate}
            disabled={imagesLoading}
          >
            {imagesLoading
              ? `Loading images (${imagesFetched} / ${people.length})`
              : "Start"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Start
