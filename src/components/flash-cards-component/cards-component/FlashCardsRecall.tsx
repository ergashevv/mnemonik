import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { Link } from "react-router-dom"
import { useFlashCardsContext } from "../../../context/FlashCardsContext"
import { useHomeContext } from "../../../context/home-context"
import StartGameModal from "../../numbers-components/start-game"
import NextPage from "../buttons-component/NextPage"
import PrevPage from "../buttons-component/PrevPage"
import "./Cards.css"

const Cards = () => {
  const {
    flashCards,
    currentFlashCard,
    setCurrentFlashCard,
    countDown,
    setCountDown,
    time,
    setTime,
  } = useFlashCardsContext()
  const { startTime } = useHomeContext()

  const { nextHandlers } = NextPage()
  const { prevHandlers } = PrevPage()

  const [flipCards, setFlipCards] = useState(() => Array(100).fill(false))

  const interval = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (interval.current) clearInterval(interval.current)

    interval.current = setTimeout(() => {
      if (countDown < 0) {
        setTime((numbers) =>
          numbers.map((number, index) =>
            currentFlashCard - 1 === index ? number + 0.1 : number
          )
        )
      }
    }, 100)

    return () => clearInterval(Number(interval.current))
  }, [countDown, setTime, currentFlashCard, time])

  useEffect(() => {
    if (countDown >= 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  })

  const firstPage = () => {
    setCurrentFlashCard(1)
  }

  return (
    <div className="cards">
      <div className="container">
        {/* <div
          className="screen-countdown"
          style={{ display: countDown > 0 ? "block" : "none" }}
        >
          <h3>Memorization starts in: </h3>
          <span>{countDown} s</span>
        </div> */}
        <StartGameModal time={startTime} />

        <div
          className="cards-section"
          style={{ display: countDown > 0 ? "none" : "block" }}
        >
          <div className="cards-section__header">
            <h1 className="cards-section__header-timer">
              {time[currentFlashCard - 1].toFixed(2)} s
            </h1>
            <Link
              to="/flash-cards/results"
              style={{ textDecoration: "none" }}
              className="cards-section__header-finish"
            >
              Finish
            </Link>
          </div>
          <div className="cards-section__items">
            {flashCards?.map((flashCard, index) => {
              const { number, text } = flashCard
              if (index === currentFlashCard - 1) {
                return (
                  <article
                    key={index}
                    style={{ transform: flipCards[index] && "rotateY(180deg)" }}
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
            <button {...prevHandlers} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextHandlers} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
