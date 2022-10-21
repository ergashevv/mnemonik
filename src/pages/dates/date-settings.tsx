import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import SelectStartTime from "../../components/start-game-select"

const DatesSettings = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/dates/game")
  }

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label>Select memorization time</label>
          <SelectStartTime time={5} />
          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}
export default DatesSettings
