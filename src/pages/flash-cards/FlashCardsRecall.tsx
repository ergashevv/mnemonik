import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router-dom"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useFlashCardsContext } from "../../context/FlashCardsContext"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import "./Cards.css"

const Cards = () => {
  const {
    flashCards,
    countDown,
    setCountDown,
    time,
    setTime,
  } = useFlashCardsContext()

  const { currentPage, setCurrentPage } = useNamesAndFacesContext()

  const { nextHandlersCards } = NextPage()
  const { prevHandlersCards } = PrevPage()

  const [flipCards, setFlipCards] = useState(() => Array(100).fill(false))
  const navigate = useNavigate()

  const interval = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (interval.current) clearInterval(interval.current)

    interval.current = setTimeout(() => {
      if (countDown < 0) {
        setTime((numbers) =>
          numbers.map((number, index) =>
            currentPage - 1 === index ? number + 0.01 : number
          )
        )
      }
    }, 10)

    return () => clearInterval(Number(interval.current))
  }, [countDown, setTime, currentPage, time])

  useEffect(() => {
    if (countDown >= 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  })

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleNavigate = () => {
    navigate("/flash-cards/results")
  }

  return (
    <div className="cards">
      <div className="container">
        <div
          className="screen-countdown"
          style={{ display: countDown > 0 ? "block" : "none" }}
        >
          <h3>Memorization starts in: </h3>
          <span>{countDown} s</span>
        </div>
        <div
          className="cards-section"
          style={{ display: countDown > 0 ? "none" : "block" }}
        >
          <div className="cards-section__header">
            <h1 className="cards-section__header-timer">
              {time[currentPage - 1].toFixed(2)} s
            </h1>
            <button
              onClick={handleNavigate}
              style={{ textDecoration: "none" }}
              className="cards-section__header-finish"
            >
              Finish
            </button>
          </div>
          <div className="cards-section__items">
            {flashCards?.map((flashCard, index) => {
              const { number, text } = flashCard
              if (index === currentPage - 1) {
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
            <span>{currentPage}</span>/<span>{flashCards?.length}</span>
          </div>
          <div className="control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevHandlersCards} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextHandlersCards} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards
