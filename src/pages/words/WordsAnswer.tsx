import { ChangeEvent } from "react"
import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router-dom"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"
import "./Words.scss"
import TimerComponent from "../../components/timer"

const WordsAnswer = () => {
  const {
    words,
    wordsPerPage,
    currentAnswers,
    setAnswers,
    cursorWidth,
  } = useWordsContext()

  const {
    currentPage,
    setCurrentPage,
    timerForAnswer,
  } = useNamesAndFacesContext()

  const { prevHandlersWords2 } = PrevPage()
  const { nextHandlersWords2 } = NextPage()

  const navigate = useNavigate()

  const handleInputs = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setAnswers((answers) =>
      answers.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleNavigate = () => {
    navigate("/words/results")
    setCurrentPage(1)
  }

  return (
    <section className="words">
      <div className="container">
        <div className="words-section__header">
          <TimerComponent time={timerForAnswer} navigateTo="/words/results" />
          <p className="words-section__header-title">Answer</p>
          <button
            onClick={handleNavigate}
            style={{ textDecoration: "none" }}
            className="words-section__header-finish"
          >
            Finish
          </button>
        </div>
        <div className="words-section__cards">
          {currentAnswers?.map((_, index) => {
            return (
              <article
                key={
                  cursorWidth === 3 || cursorWidth === 4
                    ? index + (currentPage - 1) * 12 + 1
                    : index + (currentPage - 1) * 10 + 1
                }
              >
                <form>
                  <input
                    type="text"
                    placeholder={(cursorWidth === 3 || cursorWidth === 4
                      ? index + (currentPage - 1) * 12 + 1
                      : index + (currentPage - 1) * 10 + 1
                    ).toString()}
                    value={currentAnswers[index + (currentPage - 1) * 10]}
                    onChange={(e) =>
                      handleInputs(e, index + (currentPage - 1) * 10)
                    }
                  />
                </form>
              </article>
            )
          })}
        </div>
        <div className="indicator">
          <span>{currentPage}</span>/
          <span>
            {cursorWidth === 3 || cursorWidth === 4
              ? (words?.length / (wordsPerPage + 2)).toFixed()
              : words?.length / wordsPerPage}
          </span>
        </div>
        <div className="control-buttons">
          <button onClick={firstPage} className="first-button">
            <Rewind size={32} />
          </button>
          <button {...prevHandlersWords2} className="prev-button">
            <ArrowLeft size={32} />
          </button>
          <button {...nextHandlersWords2} className="next-button">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default WordsAnswer
