import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import useFlashCardsNext from '../../hooks/useFlashCardsButton/useFlashCardsNext'
import useFlashCardsPrev from '../../hooks/useFlashCardsButton/useFlashCardsPrev'
import StartGameModal from '../../components/start-game'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import { useHomeContext } from '../../context/home-context'
import './FlashCards.scss'

const FlashCardsRecall = () => {
  const {
    flashCards,
    time,
    setTime,
    currentFlashCard,
    setCurrentFlashCard
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
        numbers.map((number, index) =>
          currentFlashCard - 1 === index ? number + 0.01 : number
        )
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
    <div className="flashCards">
      <div className="container">
        <StartGameModal time={startTime!} />
        <div
          className="flashCards-section"
          style={{ display: Number(startTime) > 0 ? 'none' : 'block' }}
        >
          <div className="flashCards-section__header">
            <h1 className="flashCards-section__header-timer">
              {time[currentFlashCard - 1].toFixed(2)} s
            </h1>
            <button
              onClick={handleNavigate}
              style={{ textDecoration: 'none' }}
              className="flashCards-section__header-finish"
            >
              Finish
            </button>
          </div>
          <div className="flashCards-section__items">
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
                    <div className="front-face">{text}</div>
                    <div className="back-face">{number}</div>
                  </article>
                )
              } else {
                return null
              }
            })}
          </div>
          <div className="indicator">
            <span>{currentFlashCard}</span>/<span>{flashCards?.length}</span>
          </div>
          <div className="control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...flashCardsPrevButton} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...flashCardsNextButton} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCardsRecall
