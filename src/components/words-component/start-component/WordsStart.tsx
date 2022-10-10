import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import { useWordsContext } from '../../../context/WordsContext'
import './Start.css'

const Start = () => {
  const {
    setCountDown,
    setMinutesForRecall,
    setMinutesForAnswer,
  } = useWordsContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/words/recall')
  }

  const handleCountDown = (e: ChangeEvent<HTMLInputElement>) => {
    setCountDown(+e.target.value)
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
        <form className="settings-time">
          <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
          <input
            type="number"
            onChange={handleCountDown}
            placeholder="Standart vaqt 5 soniya"
          />

          <label htmlFor=""> Eslab qolish vaqtini kiriting</label>
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
        </form>
        <div className="settings-start">
          <button onClick={handleNavigate}>Start</button>
        </div>
      </div>
    </div>
  )
}

export default Start
