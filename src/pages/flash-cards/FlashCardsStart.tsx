import { useNavigate } from "react-router-dom"
import SelectStartTime from "../../components/start-game-select"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const FlashCardsStart = () => {
  const { setCurrentPage } = useNamesAndFacesContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/flash-cards/recall")
    setCurrentPage(1)
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

export default FlashCardsStart
