import { ChangeEvent } from "react"
import { useNavigate } from "react-router"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const WordsStart = () => {
  const { setTimerForRecall, setTimerForAnswer } = useNamesAndFacesContext()
  const { setStartTime } = useHomeContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/words/recall")
  }

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleTimerForRecall = (e: ChangeEvent<HTMLInputElement>) => {
    setTimerForRecall(+e.target.value)
  }

  const handleTimerForAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setTimerForAnswer(+e.target.value)
  }

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
          <input
            type="number"
            onChange={handleStartTime}
            placeholder="Standart vaqt 5 soniya"
          />

          <label htmlFor="">Eslab qolish vaqtini kiriting</label>
          <input
            type="number"
            onChange={handleTimerForRecall}
            placeholder="Standart vaqt 100 soniya"
          />

          <label htmlFor="">Javob berish vaqtini kiriting</label>
          <input
            type="number"
            onChange={handleTimerForAnswer}
            placeholder="Standart vaqt 100 soniya"
          />
          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}

export default WordsStart
