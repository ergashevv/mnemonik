import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, Rewind } from 'react-feather'
import { useWordsContext } from '../../../context/WordsContext'
import NextPage from '../button-component/WordsNextPage'
import PrevPage from '../button-component/WordsPrevPage'
import '../WordsStyle.css'

const Results = () => {
  const {
    words,
    currentPageResults,
    setCurrentPageResults,
    wordsPerPage,
    currentAnswers,
    answers,
  } = useWordsContext()

  const { prevResultsHandlers } = PrevPage()
  const { nextResultsHandlers } = NextPage()

  const [visibleInputs, setVisibleInputs] = useState(
    Array(answers?.length).fill(false),
  )

  const correctAnswers = words?.filter(
    (el, index) => el === answers[index + (currentPageResults - 1) * 10],
  )

  const firstPage = () => {
    setCurrentPageResults(1)
  }

  return (
    <div className="results">
      <div className="container">
        <div className="results-section__correct-answers">
          <p>
            Umumiy: {words.length} ta
            <br />
            To'g'ri topilganlar: {correctAnswers.length}ta <br />
          </p>
        </div>
        <div className="results-section__items">
          {currentAnswers?.map((_, index) => {
            return (
              <form className="form">
                <div style={{ position: 'relative' }}>
                  <input
                    readOnly
                    type="text"
                    placeholder={(
                      index +
                      (currentPageResults - 1) * 10 +
                      1
                    ).toString()}
                    style={{
                      backgroundColor:
                        words[index + (currentPageResults - 1) * 10] !==
                        answers[index + (currentPageResults - 1) * 10]
                          ? 'rgb(255, 0, 0, .5)'
                          : 'rgba(26, 161, 19, .5)',
                    }}
                    value={
                      visibleInputs[index + (currentPageResults - 1) * 10]
                        ? words[index + (currentPageResults - 1) * 10]
                        : answers[index + (currentPageResults - 1) * 10]
                    }
                  />
                  <Eye
                    className="form-preview"
                    style={{
                      backgroundColor:
                        visibleInputs[index + (currentPageResults - 1) * 10] &&
                        'black',
                      color:
                        visibleInputs[index + (currentPageResults - 1) * 10] &&
                        'white',
                      padding:
                        visibleInputs[index + (currentPageResults - 1) * 10] &&
                        '.1rem',
                    }}
                    onClick={() => {
                      setVisibleInputs((inputs) =>
                        inputs?.map((input, inputIndex) =>
                          index + (currentPageResults - 1) * 10 === inputIndex
                            ? !visibleInputs[
                                index + (currentPageResults - 1) * 10
                              ]
                            : input,
                        ),
                      )
                    }}
                  />
                </div>
              </form>
            )
          })}
        </div>
        <div className="results-section__indicator">
          <span>{currentPageResults}</span>/
          <span>{words?.length / wordsPerPage}</span>
        </div>
        <div className="results-section__control-buttons">
          <button onClick={firstPage} className="first-button">
            <Rewind size={32} />
          </button>
          <button {...prevResultsHandlers} className="prev-button">
            <ArrowLeft size={32} />
          </button>
          <button {...nextResultsHandlers} className="next-button">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
