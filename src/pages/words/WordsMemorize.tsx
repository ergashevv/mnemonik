import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router"
import StartGameModal from "../../components/start-game"
import TimerComponent from "../../components/timer"
import { useHomeContext } from "../../context/home-context"
import { useWordsContext } from "../../context/WordsContext"
import useWordsNext from "../../hooks/useWordsButton/useWordsNext"
import useWordsPrev from "../../hooks/useWordsButton/useWordsPrev"
import "./Words.scss"

const WordsRecall = () => {
  const {
    words,
    wordsPerPage,
    currentWords,
    cursorWidth,
    highlightedWords,
    setHighlightedWords,
    currentPageWords,
    setCurrentPageWords,
  } = useWordsContext()

  const { startTime, timerForRecall } = useHomeContext()

  const { prevHighlightedButton } = useWordsPrev()
  const { nextHighlightedButton } = useWordsNext()

  const navigate = useNavigate()

  const firstPage = () => {
    setHighlightedWords(0)
    setCurrentPageWords(1)
  }

  const handleNavigate = () => {
    navigate("/words/answers")
    setCurrentPageWords(1)
  }

  return (
    <div className="words">
      <div className="container">
        <StartGameModal time={startTime!} />
        <div
          className="words-section"
          style={{ display: Number(startTime) > 0 ? "none" : "flex" }}
        >
          <div className="words-section__header">
            {Number(startTime) === 0 && (
              <TimerComponent
                time={timerForRecall}
                navigateTo="/words/answers"
              />
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
              <article
                key={index}
                style={{
                  backgroundColor:
                    index >= highlightedWords &&
                    index < highlightedWords + cursorWidth
                      ? "red"
                      : "",
                }}
              >
                <div className="number">
                  {cursorWidth === 3 || cursorWidth === 4
                    ? index + (currentPageWords - 1) * 12 + 1
                    : index + (currentPageWords - 1) * 10 + 1}
                  .
                </div>
                <div className="word">{word}</div>
              </article>
            ))}
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
            <button {...prevHighlightedButton} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextHighlightedButton} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordsRecall
