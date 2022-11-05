import { useNavigate } from 'react-router'
import useFacesNext from '../../hooks/useFacesButton/useFacesNext'
import useFacesPrev from '../../hooks/useFacesButton/useFacesPrev'
import StartGameModal from '../../components/start-game'
import { useHomeContext } from '../../context/home-context'
import { useFacesContext } from '../../context/FacesContext'
import './NF.scss'
import TimerComponent from '../../components/timer'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'

const Recall = () => {
  const {
    memorizationPeople,
    currentPageFaces,
    setCurrentPageFaces,
    navigationFaces,
  } = useFacesContext()

  const { startTime, timerForRecall } = useHomeContext()

  const navigate = useNavigate()

  const { facesPrevButton } = useFacesPrev()
  const { facesNextButton } = useFacesNext()

  const firstPage = () => {
    setCurrentPageFaces(1)
  }

  const handleNavigate = () => {
    navigate('/names-and-faces/answers')
    setCurrentPageFaces(1)
  }

  return (
    <>
      {Number(startTime) > 0 ? (
        <StartGameModal time={String(startTime)} />
      ) : (
        <div className='faces'>
          <div className='container'>
            <StartGameModal time={startTime!} />
            <div className='faces-section'>
              <div className='faces-section__header'>
                {Number(startTime) === 0 && (
                  <TimerComponent time={timerForRecall} navigateTo={'/names-and-faces/answers'} />
                )}
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
                  {memorizationPeople.map((person, index) => {
                    const { img, firstName, lastName } = person
                    if (currentPageFaces - 1 === index) {
                      return (
                        <article key={index}>
                          <img src={img} alt={firstName} />
                          <h4>{firstName}</h4>
                          <h4>{lastName}</h4>
                        </article>
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
                <div className='indicator'>
                  <span>{currentPageFaces}</span>/<span>{memorizationPeople.length}</span>
                </div>
              </div>
              <div className='control-buttons'>
                <button
                  style={{ pointerEvents: navigationFaces === 'auto' ? 'none' : 'all' }}
                  {...facesPrevButton}
                  className='prev-button'
                >
                  <img src={ArrowLeft} alt='ArrowLeft' />
                </button>
                <button
                  style={{ pointerEvents: navigationFaces === 'auto' ? 'none' : 'all' }}
                  onClick={firstPage}
                  className='first-button'
                >
                  <img src={ChevronsLeft} alt='First Page' />
                </button>
                <button
                  style={{ pointerEvents: navigationFaces === 'auto' ? 'none' : 'all' }}
                  {...facesNextButton}
                  className='next-button'
                >
                  <img src={ArrowRight} alt='ArrowRight' />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Recall
