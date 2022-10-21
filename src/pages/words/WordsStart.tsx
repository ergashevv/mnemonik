import { ChangeEvent } from "react"
import { useNavigate } from "react-router"
import SelectStartTime from "../../components/start-game-select"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import { useWordsContext } from "../../context/WordsContext"

const WordsStart = () => {
  const { setCurrentPage } = useNamesAndFacesContext()
  const { setCursorWidth, cursorWidth } = useWordsContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/words/recall")
    setCurrentPage(1)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCursorWidth(+e.target.value)
  }

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label>Select memorization time</label>
          <SelectStartTime time={5} />

          <label>Select cursor numbers</label>
          <select defaultValue={cursorWidth} onChange={handleSelect}>
            <option selected value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}

export default WordsStart
