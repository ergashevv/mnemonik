import { ChangeEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectStartTime from '../../components/start-game-select'
import { useFacesContext } from '../../context/FacesContext'
import BackIcon from '../../assets/images/icons/back-icon.svg'

const blobToBase64 = async (blob: Blob) =>
  await new Promise((resolve, reject) => {
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
    autoSecondFaces,
    setAutoSecondFaces,
    navigationFaces,
    setNavigationFaces,
  } = useFacesContext()

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

    navigate('/names-and-faces/recall')
    setCurrentPageFaces(1)
  }, [navigate, memorizationPeople, setCurrentPageFaces, setMemorizationPeople, setRecallPeople])

  const handleBack = () => {
    navigate('/')
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigationFaces(e.target.value)
  }

  const handleAutoSecond = (e: ChangeEvent<HTMLInputElement>) => {
    setAutoSecondFaces(+e.target.value)
  }

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Yuzlar</div>
        </div>
        <form className='settings-form'>
          <SelectStartTime time={5} />

          <label>Ko'rsatkichni tanlash</label>
          <select
            defaultValue={navigationFaces === 'auto' ? 'auto' : 'custom'}
            onChange={handleNavigation}
          >
            <option value='custom'>Custom</option>
            <option value='auto'>Auto</option>
          </select>
          {navigationFaces === 'auto' ? (
            <div>
              <label>Avtomatik o'tish vaqti</label>
              <h3>Vaqt: {Number(autoSecondFaces) / 10}s</h3>
              <input value={autoSecondFaces} onChange={handleAutoSecond} max={50} type='range' />
            </div>
          ) : null}
          <button type='submit' onClick={handleNavigate} disabled={imagesLoading}>
            {imagesLoading
              ? `Loading images (${imagesFetched} / ${memorizationPeople.length})`
              : 'Boshlash'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Start
