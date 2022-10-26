import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import SelectStartTime from "../../components/start-game-select"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import ArrowLeft from "../../assets/images/icons/arrow-left.svg"

const blobToBase64 = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const Start = () => {
  const [imagesLoading, setImagesLoading] = useState<boolean>(false)

  const {
    memorizationPeople,
    setMemorizationPeople,
    recallPeople,
    setRecallPeople,
    setCurrentPageFaces,
  } = useNamesAndFacesContext()

  const [imagesFetched, setImagesFetched] = useState<number>(0)

  const navigate = useNavigate()

  const handleNavigate = useCallback(async () => {
    setImagesLoading(true)

    const peopleWithUpdatedImages = await Promise.all(
      recallPeople.map(async ({ img, ...person }) => {
        const res = await fetch(img)

        const blob = await res.blob()

        const url = (await blobToBase64(blob)) as string

        setImagesFetched((fetched) => fetched + 1)

        return { ...person, img: url }
      })
    )

    setRecallPeople((shuffledPeople) => {
      return shuffledPeople.map((person) => {
        const { img } = peopleWithUpdatedImages.find(
          (updatedPerson) =>
            person.firstName === updatedPerson.firstName &&
            person.lastName === updatedPerson.lastName
        )!

        return { ...person, img }
      })
    })

    setMemorizationPeople(peopleWithUpdatedImages)

    navigate("/names-and-faces/recall")

    setCurrentPageFaces(1)
  }, [navigate, memorizationPeople, setCurrentPageFaces, setMemorizationPeople, setRecallPeople])

  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={ArrowLeft} alt="Back" onClick={handleBack} />
          </div>
          <div className="settings-header__title">Playing Cards</div>
        </div>
        <form className="settings-form">
          <label>Tayyorgarlik vaqti</label>
          <SelectStartTime time={5} />

          <button
            type="submit"
            onClick={handleNavigate}
            disabled={imagesLoading}
          >
            {imagesLoading
              ? `Loading images (${imagesFetched} / ${memorizationPeople.length})`
              : "Boshlash"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Start
