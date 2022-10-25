import { ChangeEvent } from "react"
import { useNavigate } from "react-router"
import SelectStartTime from "../../components/start-game-select"
import { useWordsContext } from "../../context/WordsContext"
import ArrowLeft from "../../assets/images/icons/arrow-left.svg"
import { useEffect } from "react"

const WordsStart = () => {
  const {
    setCursorWidth,
    cursorWidth,
    setCurrentPageWords,
    setHighlightedWords,
  } = useWordsContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/words/recall")
    setHighlightedWords(0)
    setCurrentPageWords(1)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCursorWidth(+e.target.value)
  }

  const handleBack = () => {
    navigate("/")
  }

  useEffect(() => {
    if (!cursorWidth) {
      setCursorWidth(1)
    }
  }, [])

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={ArrowLeft} alt="Back" onClick={handleBack} />
          </div>
          <div className="settings-header__title">So'zlar</div>
        </div>
        <form className="settings-form">
          <label>Select memorization time</label>
          <SelectStartTime time={5} />

          <label>Select cursor numbers</label>
          <select defaultValue={cursorWidth} onChange={handleSelect}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={handleNavigate}>Boshlash</button>
        </form>
      </div>
    </div>
  )
}

export default WordsStart
