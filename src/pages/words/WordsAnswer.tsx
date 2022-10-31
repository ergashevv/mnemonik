import { ChangeEvent } from 'react'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import TimerComponent from '../../components/timer'
import { useHomeContext } from '../../context/home-context'
import { useWordsContext } from '../../context/WordsContext'
import useWordsNext from '../../hooks/useWordsButton/useWordsNext'
import useWordsPrev from '../../hooks/useWordsButton/useWordsPrev'
import './Words.scss'

const WordsAnswer = () => {
  const {
    words,
    wordsPerPage,
    currentAnswers,
    setAnswers,
    cursorWidth,
    currentPageWords,
    setCurrentPageWords
  } = useWordsContext()

  const { timerForAnswer } = useHomeContext()

  const { wordsNextButton } = useWordsNext()
  const { wordsPrevButton } = useWordsPrev()

  const navigate = useNavigate()

  const handleInputs = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setAnswers((answers) =>
      answers.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const firstPage = () => {
    setCurrentPageWords(1)
  }

  const handleNavigate = () => {
    navigate('/words/results')
    setCurrentPageWords(1)
  }

  return (
    <section className="words">
      <div className="container">
        <div className="words-section__header">
          <TimerComponent time={timerForAnswer} navigateTo="/words/results" />
          <p className="words-section__header-title">Answer</p>
          <button
            onClick={handleNavigate}
            style={{ textDecoration: 'none' }}
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
                  <input
                    type="text"
                    value={currentAnswers[index + (currentPageWords - 1) * 10]}
                    onChange={(e) =>
                      handleInputs(e, index + (currentPageWords - 1) * 10)
                    }
                  />
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
    </section>
  )
}

export default WordsAnswer
