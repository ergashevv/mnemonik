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

const FlashCardsRecall = () => {
  const {
    flashCards,
    time,
    setTime,
    currentFlashCard,
    setCurrentFlashCard,
  } = useFlashCardsContext()

  const { startTime } = useHomeContext()

  const { flashCardsNextButton } = useFlashCardsNext()
  const { flashCardsPrevButton } = useFlashCardsPrev()

  const [flipCards, setFlipCards] = useState(() => Array(100).fill(false))
  const navigate = useNavigate()

  const interval = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (interval.current != null) clearInterval(interval.current)

    interval.current = setInterval(() => {
      setTime((numbers) =>
        numbers.map((number, index) => (currentFlashCard - 1 === index ? number + 0.01 : number))
      )
    }, 10)

    return () => clearInterval(Number(interval.current))
  }, [setTime, currentFlashCard, time, startTime])

  const firstPage = () => {
    setCurrentFlashCard(1)
  }

  const handleNavigate = () => {
    navigate('/flash-cards/results')
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
              <div className='flashCards-section__header'>
                <h1 className='flashCards-section__header-timer'>
                  {time[currentFlashCard - 1].toFixed(2)} s
                </h1>
                <button
                  onClick={handleNavigate}
                  style={{ textDecoration: 'none' }}
                  className='flashCards-section__header-finish'
                >
                  Hoziroq tugatish
                </button>
              </div>
              <div className='container-wrapper'>
                <div className='flashCards-section__items'>
                  {flashCards?.map((flashCard, index) => {
                    const { number, text } = flashCard
                    if (index === currentFlashCard - 1) {
                      return (
                        <article
                          key={index}
                          style={{ transform: flipCards[index] && 'rotateY(180deg)' }}
                          onClick={() =>
                            setFlipCards((cards) =>
                              cards.map((card, cardIndex) =>
                                index === cardIndex ? !flipCards[index] : card
                              )
                            )
                          }
                        >
                          <div className='front-face'>{text}</div>
                          <div className='back-face'>{number}</div>
                        </article>
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
                <div className='indicator'>
                  <span>{currentFlashCard}</span>/<span>{flashCards?.length}</span>
                </div>
              </div>
              <div className='control-buttons'>
                <button {...flashCardsPrevButton} className='prev-button'>
                  <img src={ArrowLeft} alt='ArrowLeft' />
                </button>
                <button onClick={firstPage} className='first-button'>
                  <img src={ChevronsLeft} alt='First Page' />
                </button>
                <button {...flashCardsNextButton} className='next-button'>
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

export default FlashCardsRecall
