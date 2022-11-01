import { useNavigate } from 'react-router-dom'
import SelectStartTime from '../../components/start-game-select'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

const FlashCardsStart = () => {
  const { setCurrentFlashCard } = useFlashCardsContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/flash-cards/recall')
    setCurrentFlashCard(1)
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={BackIcon} alt="Back" onClick={handleBack} />
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
