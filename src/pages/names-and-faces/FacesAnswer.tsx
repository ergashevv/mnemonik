import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import TimerComponent from '../../components/timer'
import { useFacesContext } from '../../context/FacesContext'
import { useHomeContext } from '../../context/home-context'
import useFacesNext from '../../hooks/useFacesButton/useFacesNext'
import useFacesPrev from '../../hooks/useFacesButton/useFacesPrev'
import './NF.scss'

const Answer = () => {
  const {
    recallPeople,
    currentPageFaces,
    setCurrentPageFaces,
    firstNames,
    lastNames,
    setFirstNames,
    setLastNames,
  } = useFacesContext()

  const { timerForAnswer } = useHomeContext()

  const { facesNextButton } = useFacesNext()
  const { facesPrevButton } = useFacesPrev()

  const navigate = useNavigate()

  const handleLastName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setLastNames((lastNames) =>
      lastNames.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setFirstNames((firstNames) =>
      firstNames.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const firstPage = () => {
    setCurrentPageFaces(1)
  }

  const handleNavigate = () => {
    navigate('/names-and-faces/results')
    setCurrentPageFaces(1)
  }

  return (
    <div className='faces'>
      <div className='container'>
        <div className='faces-section'>
          <div className='faces-section__header'>
            <TimerComponent time={timerForAnswer} navigateTo={'/names-and-faces/results'} />
            <button
              onClick={handleNavigate}
              style={{ textDecoration: 'none' }}
              className='faces-section__header-finish'
            >
              Hoziroq tugatish
            </button>
          </div>
          <div className='container-wrapper'>
            <div className='faces-section__cards'>
              {recallPeople?.map((shuffledPerson, index) => {
                const { img, firstName } = shuffledPerson
                if (index === currentPageFaces - 1) {
                  return (
                    <article key={index}>
                      <img src={img} alt={firstName} />
                      <form>
                        <input
                          type='text'
                          placeholder='Ism'
                          value={firstNames[index]}
                          onChange={(e) => handleFirstName(e, index)}
                        />
                        <input
                          type='text'
                          placeholder='Familiya'
                          value={lastNames[index]}
                          onChange={(e) => handleLastName(e, index)}
                        />
                      </form>
                    </article>
                  )
                } else {
                  return null
                }
              })}
            </div>
            <div className='indicator'>
              <span>{currentPageFaces}</span>/<span>{recallPeople?.length}</span>
            </div>
          </div>

          <div className='control-buttons'>
            <button {...facesPrevButton} className='prev-button'>
              <img src={ArrowLeft} alt='ArrowLeft' />
            </button>
            <button onClick={firstPage} className='first-button'>
              <img src={ChevronsLeft} alt='First Page' />
            </button>
            <button {...facesNextButton} className='next-button'>
              <img src={ArrowRight} alt='ArrowRight' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Answer
