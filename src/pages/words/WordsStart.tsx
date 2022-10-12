import { ChangeEvent } from "react"
import { useNavigate } from "react-router"
import { useHomeContext } from "../../context/home-context"
import { useWordsContext } from "../../context/WordsContext"

const WordsStart = () => {
  const { setMinutesForRecall, setMinutesForAnswer } = useWordsContext()
  const { setStartTime } = useHomeContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/words/recall")
  }

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(+e.target.value)
  }

  const handleMinutesForRecall = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutesForRecall(+e.target.value)
  }

  const handleMinutesForAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setMinutesForAnswer(+e.target.value)
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
            onChange={handleMinutesForAnswer}
            placeholder="Standart vaqt 5 daqiqa"
          />

          <label htmlFor="">Javob berish vaqtini kiriting</label>
          <input
            type="number"
            onChange={handleMinutesForRecall}
            placeholder="Standart vaqt 5 daqiqa "
          />
          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}

export default WordsStart
