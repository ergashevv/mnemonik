import { useNavigate } from 'react-router-dom'
import BackIcon from '../../../assets/images/icons/back-icon.svg'

const FlashCardsSettings = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const handleNavigate = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handleNavigateGame = () => {
    navigate('/flash-cards/settings/main')
  }

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Flash Cards</div>
        </div>
        <div className='settings-buttons'>
          <button onClick={handleNavigateGame}>O'yin</button>
          <button onClick={handleNavigate}>Tizim yaratish</button>
        </div>
      </div>
    </div>
  )
}

export default FlashCardsSettings
