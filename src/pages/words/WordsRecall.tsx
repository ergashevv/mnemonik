import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import StartGameModal from "../../components/numbers-components/start-game"
import TimerComponent from "../../components/timer"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"
import "./Words.scss"

const WordsRecall = () => {
  const { words, wordsPerPage, currentWords } = useWordsContext()
  
  const { startTime } = useHomeContext()

  const { currentPage, setCurrentPage, timerForRecall } = useNamesAndFacesContext()

  const { prevHandlersWords } = PrevPage()
  const { nextHandlersWords } = NextPage()

  const navigate = useNavigate()

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleNavigate = () => {
    navigate("/words/answers")
    setCurrentPage(1)
  }

  return (
    <div className="words">
      <div className="container">
        <StartGameModal time={startTime} />
        <div
          className="words-section"
          style={{ display: startTime > 0 ? "none" : "flex" }}
        >
          <div className="words-section__header">
            {startTime === 0 && (
              <TimerComponent time={timerForRecall} navigateTo="/words/answers" />
            )}
            <p className="words-section__header-title">Recall</p>
            <button
              onClick={handleNavigate}
              style={{ textDecoration: "none" }}
              className="words-section__header-finish"
            >
              Finish
            </button>
          </div>

          <div className="words-section__cards">
            {currentWords?.map((word, index) => (
              <article key={index + (currentPage - 1) * 10 + 1}>
                <div className="number">
                  {index + (currentPage - 1) * 10 + 1}.
                </div>
                <div className="word">{word}</div>
              </article>
            ))}
          </div>
          <div className="indicator">
            <span>{currentPage}</span>/
            <span>{words?.length / wordsPerPage}</span>
          </div>
          <div className="control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevHandlersWords} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextHandlersWords} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordsRecall
