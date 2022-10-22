import { useNavigate } from "react-router-dom"
import SelectStartTime from "../../components/start-game-select"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import ArrowLeft from "../../assets/images/icons/arrow-left.svg"

const FlashCardsStart = () => {
  const { setCurrentPage } = useNamesAndFacesContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/flash-cards/recall")
    setCurrentPage(1)
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
          <div className="settings-header__title">Flash Cards</div>
        </div>
        <form className="settings-form">
          <label></label>
          <SelectStartTime time={5} />
          <button onClick={handleNavigate}>Boshlash</button>
        </form>
      </div>
    </div>
  )
}

export default FlashCardsStart
