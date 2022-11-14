import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import StartGameModal from '../../components/start-game'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import { useHomeContext } from '../../context/home-context'
import useFlashCardsNext from '../../hooks/useFlashCardsButton/useFlashCardsNext'
import useFlashCardsPrev from '../../hooks/useFlashCardsButton/useFlashCardsPrev'
import './FlashCards.scss'

const MillenniumMemorize = () => {
  const {
    timeMillennium,
    setTimeMillennium,
    currentFlashCard,
    setCurrentFlashCard,
    navigationFlashCards,
    shuffledMillennium,
  } = useFlashCardsContext()

  const { startTime } = useHomeContext()

  const { flashCardsNextButton } = useFlashCardsNext()
  const { flashCardsPrevButton } = useFlashCardsPrev()

  const [flipCards, setFlipCards] = useState(() => Array(100).fill(false))
  const navigate = useNavigate()

  const hundredNumbers = JSON.parse(localStorage.getItem('hundreds')!)

  const interval = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (interval.current != null) clearInterval(interval.current)

    interval.current = setInterval(() => {
      setTimeMillennium((numbers) =>
        numbers.map((number, index) => (currentFlashCard - 1 === index ? number + 0.01 : number))
      )
    }, 10)
    return () => clearInterval(Number(interval.current))
  }, [])

  const firstPage = () => {
    setCurrentFlashCard(1)
  }

  const handleNavigate = () => {
    navigate('/flash-cards/millennium/results')
  }

  return (
    <>
      {Number(startTime) > 0 ? (
        <StartGameModal time={String(startTime)} />
      ) : (
        <div className='flashCards'>
          <div className='container'>
            <StartGameModal time={startTime!} />
            <div className='flashCards-section'>
              {navigationFlashCards !== 'auto' ? (
                <div className='flashCards-section__header'>
                  <h1 className='flashCards-section__header-timer'>
                    {timeMillennium[currentFlashCard - 1].toFixed(2)} s
                  </h1>
                  <button
                    onClick={handleNavigate}
                    style={{ textDecoration: 'none' }}
                    className='flashCards-section__header-finish'
                  >
                    Hoziroq tugatish
                  </button>
                </div>
              ) : null}
              <div className='container-wrapper__card'>
                <div className='flashCards-section__items'>
                  {shuffledMillennium.map((el: any, index: number) => {
                    const { millenniumNumber, millenniumObraz } = el
                    if (index === currentFlashCard - 1) {
                      return (
                        <article
                          key={index + Number(hundredNumbers)}
                          style={{ transform: flipCards[index] && 'rotateY(180deg)' }}
                          onClick={() =>
                            setFlipCards((cards) =>
                              cards.map((card, cardIndex) =>
                                index === cardIndex ? !flipCards[index] : card
                              )
                            )
                          }
                        >
                          <div className='front-face'>{millenniumObraz}</div>
                          <div className='back-face'>
                            {millenniumNumber < 10
                              ? `00${millenniumNumber}`
                              : millenniumNumber >= 10 && millenniumNumber < 100
                              ? `0${millenniumNumber}`
                              : millenniumNumber}
                          </div>
                        </article>
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
                <div className='indicator'>
                  <span>{currentFlashCard}</span>/<span>{shuffledMillennium?.length}</span>
                </div>
              </div>
              <div className='control-buttons'>
                <button
                  style={{ pointerEvents: navigationFlashCards === 'auto' ? 'none' : 'all' }}
                  {...flashCardsPrevButton}
                  className='prev-button'
                >
                  <img src={ArrowLeft} alt='ArrowLeft' />
                </button>
                <button
                  style={{ pointerEvents: navigationFlashCards === 'auto' ? 'none' : 'all' }}
                  onClick={firstPage}
                  className='first-button'
                >
                  <img src={ChevronsLeft} alt='First Page' />
                </button>
                <button
                  style={{ pointerEvents: navigationFlashCards === 'auto' ? 'none' : 'all' }}
                  {...flashCardsNextButton}
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

export default MillenniumMemorize
