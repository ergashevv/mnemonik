import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router-dom"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import StartGameModal from "../../components/start-game"
import { useFlashCardsContext } from "../../context/FlashCardsContext"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import TimerFlashCards from "./flash-cards-timer"
import "./FlashCards.scss"

const FlashCardsRecall = () => {
  const { flashCards, time, setTime } = useFlashCardsContext()

  const { startTime } = useHomeContext()

  const { currentPage, setCurrentPage } = useNamesAndFacesContext()

  const { nextHandlersCards } = NextPage()
  const { prevHandlersCards } = PrevPage()

  const [flipCards, setFlipCards] = useState(() => Array(100).fill(false))
  const navigate = useNavigate()

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleNavigate = () => {
    navigate("/flash-cards/results")
  }

  return (
    <div className="flashCards">
      <div className="container">
        <StartGameModal time={startTime!} />
        <div
          className="flashCards-section"
          style={{ display: Number(startTime) > 0 ? "none" : "block" }}
        >
          <div className="flashCards-section__header">
            <TimerFlashCards />
            <button
              onClick={handleNavigate}
              style={{ textDecoration: "none" }}
              className="flashCards-section__header-finish"
            >
              Finish
            </button>
          </div>
          <div className="flashCards-section__items">
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

export default FlashCardsRecall
