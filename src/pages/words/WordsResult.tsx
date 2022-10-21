import { useState } from "react"
import { ArrowLeft, ArrowRight, Eye, Rewind } from "react-feather"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"
import "./Words.scss"

const WordsResult = () => {
  const {
    words,
    wordsPerPage,
    currentAnswers,
    answers,
    cursorWidth,
  } = useWordsContext()
  const { currentPage, setCurrentPage } = useNamesAndFacesContext()

  const { prevHandlersWords2 } = PrevPage()
  const { nextHandlersWords2 } = NextPage()

  const [visibleInputs, setVisibleInputs] = useState(
    Array(answers?.length).fill(false)
  )

  const correctAnswers = words?.filter(
    (el, index) =>
      el?.toLowerCase() ===
      answers[index + (currentPage - 1) * 10]?.toLowerCase()
  )

  const firstPage = () => {
    setCurrentPage(1)
  }

  return (
    <div className="words">
      <div className="container">
        <div className="words-section__correct-answers">
          <p>
            Umumiy: {words.length} ta
            <br />
            To'g'ri topilganlar: {correctAnswers.length}ta <br />
          </p>
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
                  <div style={{ position: "relative" }}>
                    <input
                      readOnly
                      type="text"
                      placeholder={(cursorWidth === 3 || cursorWidth === 4
                        ? index + (currentPage - 1) * 12 + 1
                        : index + (currentPage - 1) * 10 + 1
                      ).toString()}
                      style={{
                        backgroundColor:
                          answers[index + (currentPage - 1) * 10] === ""
                            ? "#fff"
                            : answers[index + (currentPage - 1) * 10].length >
                                0 &&
                              words[
                                index + (currentPage - 1) * 10
                              ]?.toLowerCase() !==
                                answers[
                                  index + (currentPage - 1) * 10
                                ]?.toLowerCase()
                            ? "rgba(255, 0, 0, .5)"
                            : "rgba(26, 161, 19, .5)",
                      }}
                      value={
                        visibleInputs[index + (currentPage - 1) * 10]
                          ? words[index + (currentPage - 1) * 10]
                          : answers[index + (currentPage - 1) * 10]
                      }
                    />
                    <Eye
                      className="form-preview"
                      style={{
                        backgroundColor:
                          visibleInputs[index + (currentPage - 1) * 10] &&
                          "black",
                        color:
                          visibleInputs[index + (currentPage - 1) * 10] &&
                          "white",
                        padding:
                          visibleInputs[index + (currentPage - 1) * 10] &&
                          ".1rem",
                      }}
                      onClick={() => {
                        setVisibleInputs((inputs) =>
                          inputs?.map((input, inputIndex) =>
                            index + (currentPage - 1) * 10 === inputIndex
                              ? !visibleInputs[index + (currentPage - 1) * 10]
                              : input
                          )
                        )
                      }}
                    />
                  </div>
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
    </div>
  )
}

export default WordsResult
