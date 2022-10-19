import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import { useHomeContext } from "../../context/home-context"

const DatesSettings = () => {
  const { startTime, setStartTime } = useHomeContext()

  const navigate = useNavigate()

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
  }

  const handleNavigate = () => {
    navigate("/dates/game")
  }

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label>Enter time</label>
          <input value={startTime} onChange={handleStartTime} type="number" />
          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}
export default DatesSettings
