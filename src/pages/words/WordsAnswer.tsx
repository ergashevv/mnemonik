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
  const { words, wordsPerPage, currentAnswers, setAnswers } = useWordsContext()

  const { currentPage, setCurrentPage, timerForAnswer } = useNamesAndFacesContext()

  const { prevHandlersWords } = PrevPage()
  const { nextHandlersWords } = NextPage()

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
              <article key={index}>
                <form>
                  <input
                    type="text"
                    placeholder={(
                      index +
                      (currentPage - 1) * 10 +
                      1
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
          <span>{currentPage}</span>/<span>{words?.length / wordsPerPage}</span>
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
    </section>
  )
}

export default WordsAnswer
