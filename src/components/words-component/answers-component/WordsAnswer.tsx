import { ChangeEvent, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { useWordsContext } from '../../../context/WordsContext'
import NextPage from '../button-component/WordsNextPage'
import PrevPage from '../button-component/WordsPrevPage'
import '../WordsStyle.css'

const Answer = () => {
  const {
    words,
    currentPageAnswers,
    setCurrentPageAnswers,
    wordsPerPage,
    currentAnswers,
    setAnswers,
    answers,
    minutesForAnswer,
    setMinutesForAnswer,
  } = useWordsContext()

  const { prevAnswersHandlers } = PrevPage()
  const { nextAnswersHandlers } = NextPage()

  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else if (seconds === 0) {
        if (minutesForAnswer === 0) {
          navigate('/words/results')
        } else {
          setMinutesForAnswer((minutesForAnswer) => minutesForAnswer - 1)
          setSeconds(59)
        }
      }
    }, 1000)
  }, [minutesForAnswer, seconds, setMinutesForAnswer, setSeconds, navigate])

  const handleInputs = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setAnswers((answers) =>
      answers.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue,
      ),
    )
  }

  const firstPage = () => {
    setCurrentPageAnswers(1)
  }

  return (
    <section className="answers">
      <div className="container">
        <div className="answers-section__header">
          {minutesForAnswer === 0 && seconds === 0 ? null : (
            <h3 className="answers-section__header-time">
              {minutesForAnswer}m {seconds < 10 ? `0${seconds}` : seconds}s
            </h3>
          )}
          <p className="answers-section__header-title">Answer</p>
          <Link
            to="/words/results"
            style={{ textDecoration: 'none' }}
            className="answers-section__header-finish"
          >
            Finish
          </Link>
        </div>
        <div className="answers-section__items">
          {currentAnswers?.map((_, index) => {
            return (
              <form className="form">
                <input
                  type="text"
                  placeholder={(
                    index +
                    (currentPageAnswers - 1) * 10 +
                    1
                  ).toString()}
                  value={answers[index + (currentPageAnswers - 1) * 10]}
                  onChange={(e) =>
                    handleInputs(e, index + (currentPageAnswers - 1) * 10)
                  }
                />
              </form>
            )
          })}
        </div>
        <div className="answers-section__indicator">
          <span>{currentPageAnswers}</span>/
          <span>{words?.length / wordsPerPage}</span>
        </div>
        <div className="answers-section__control-buttons">
          <button onClick={firstPage} className="first-button">
            <Rewind size={32} />
          </button>
          <button {...prevAnswersHandlers} className="prev-button">
            <ArrowLeft size={32} />
          </button>
          <button {...nextAnswersHandlers} className="next-button">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Answer
