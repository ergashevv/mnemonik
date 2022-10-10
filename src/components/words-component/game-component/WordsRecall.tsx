import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Rewind } from 'react-feather'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useWordsContext } from '../../../context/WordsContext'
import NextPage from '../button-component/WordsNextPage'
import PrevPage from '../button-component/WordsPrevPage'
import '../WordsStyle.css'

const Game = () => {
  const {
    words,
    currentPageRecall,
    setCurrentPageRecall,
    wordsPerPage,
    currentWords,
    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
  } = useWordsContext()

  const { prevRecallHandlers } = PrevPage()
  const { nextRecallHandlers } = NextPage()

  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (countDown < 0) {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else if (seconds === 0) {
          if (minutesForRecall === 0) {
            navigate('/words/answers')
          } else {
            setMinutesForRecall((minutesForRecall) => minutesForRecall - 1)
            setSeconds(59)
          }
        }
      }
    }, 1000)
  }, [
    countDown,
    seconds,
    minutesForRecall,
    setSeconds,
    setMinutesForRecall,
    navigate,
  ])

  useEffect(() => {
    if (countDown >= 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  })

  const firstPage = () => {
    setCurrentPageRecall(1)
  }

  return (
    <div className="words">
      <div className="container">
        <div
          className="screen-countdown"
          style={{ display: countDown > 0 ? 'block' : 'none' }}
        >
          <h3>Memorization starts in: </h3>
          <span>{countDown} s</span>
        </div>

        <div
          className="words-section"
          style={{ display: countDown > 0 ? 'none' : 'flex' }}
        >
          <div className="words-section__header">
            {minutesForRecall === 0 && seconds === 0 ? null : (
              <h3 className="words-section__header-timer">
                {minutesForRecall}m {seconds < 10 ? `0${seconds}` : seconds}s
              </h3>
            )}
            <p className="words-section__header-title">Recall</p>
            <Link
              to="/words/answers"
              style={{ textDecoration: 'none' }}
              className="words-section__header-finish"
            >
              Finish
            </Link>
          </div>

          <div className="words-section__cards">
            {currentWords?.map((word, index) => {
              return (
                <article key={index + (currentPageRecall - 1) * 10 + 1}>
                  <div className="number">
                    {index + (currentPageRecall - 1) * 10 + 1}.
                  </div>
                  <div className="word"> {word}</div>
                </article>
              )
            })}
          </div>
          <div className="words-section__indicator">
            <span>{currentPageRecall}</span>/
            <span>{words?.length / wordsPerPage}</span>
          </div>
          <div className="words-section__control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevRecallHandlers} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextRecallHandlers} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
