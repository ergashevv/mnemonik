import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import SelectStartTime from "../../components/start-game-select"
import ArrowLeft from "../../assets/images/icons/arrow-left.svg"

const DatesSettings = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/dates/game")
  }

  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={ArrowLeft} alt="Back" onClick={handleBack} />
          </div>
          <div className="settings-header__title">Sanalar</div>
        </div>
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
