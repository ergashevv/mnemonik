import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, Rewind } from 'react-feather'
import useWordsNext from '../../hooks/useWordsButton/useWordsNext'
import useWordsPrev from '../../hooks/useWordsButton/useWordsPrev'
import { useWordsContext } from '../../context/WordsContext'
import './Words.scss'

const WordsResult = () => {
  const {
    words,
    wordsPerPage,
    currentAnswers,
    answers,
    cursorWidth,
    currentPageWords,
    setCurrentPageWords
  } = useWordsContext()

  const { wordsPrevButton } = useWordsPrev()
  const { wordsNextButton } = useWordsNext()

  const [visibleInputs, setVisibleInputs] = useState(
    Array(answers?.length).fill(false)
  )

  const correctAnswers = words?.filter(
    (el, index) =>
      el?.toLowerCase() ===
      answers[index + (currentPageWords - 1) * 10]?.toLowerCase()
  )

  const firstPage = () => {
    setCurrentPageWords(1)
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
                    ? index + (currentPageWords - 1) * 12 + 1
                    : index + (currentPageWords - 1) * 10 + 1
                }
              >
                <div className="number">
                  {cursorWidth === 3 || cursorWidth === 4
                    ? index + (currentPageWords - 1) * 12 + 1
                    : index + (currentPageWords - 1) * 10 + 1}
                  .
                </div>
                <form>
                  <div style={{ position: 'relative' }}>
                    <input
                      readOnly
                      type="text"
                      style={{
                        backgroundColor:
                          answers[index + (currentPageWords - 1) * 10] === ''
                            ? '#fff'
                            : answers[index + (currentPageWords - 1) * 10]
                              .length > 0 &&
                              words[index + (currentPageWords - 1) * 10]
                                ?.toLowerCase()
                                .trim() !==
                                answers[index + (currentPageWords - 1) * 10]
                                  ?.toLowerCase()
                                  .trim()
                              ? 'rgba(255, 0, 0, .5)'
                              : 'rgba(26, 161, 19, .5)'
                      }}
                      value={
                        visibleInputs[index + (currentPageWords - 1) * 10]
                          ? words[index + (currentPageWords - 1) * 10]
                          : answers[index + (currentPageWords - 1) * 10]
                      }
                    />
                    <Eye
                      className="form-preview"
                      style={{
                        backgroundColor:
                          visibleInputs[index + (currentPageWords - 1) * 10] &&
                          'black',
                        color:
                          visibleInputs[index + (currentPageWords - 1) * 10] &&
                          'white',
                        padding:
                          visibleInputs[index + (currentPageWords - 1) * 10] &&
                          '.1rem'
                      }}
                      onClick={() => {
                        setVisibleInputs((inputs) =>
                          inputs?.map((input, inputIndex) =>
                            index + (currentPageWords - 1) * 10 === inputIndex
                              ? !visibleInputs[
                                  index + (currentPageWords - 1) * 10
                                ]
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
          <span>{currentPageWords}</span>/
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
          <button {...wordsPrevButton} className="prev-button">
            <ArrowLeft size={32} />
          </button>
          <button {...wordsNextButton} className="next-button">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WordsResult
