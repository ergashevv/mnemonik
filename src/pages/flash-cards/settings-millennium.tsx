import React from 'react'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useNavigate } from 'react-router'
import { flashCardsData } from '../../datas/flash-cards/FlashCardsData'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

const SettingsMillennium = () => {
  const navigate = useNavigate()

  const { setCurrentFlashCard } = useFlashCardsContext()

  const handleNavigate = () => {
    navigate('/flash-cards/recall')
    setCurrentFlashCard(1)
  }

  const handleBack = () => {
    navigate('/flash-cards/settings')
  }

  return (
    <div className='settings'>
    <div className='container'>
      <div className='settings-header'>
        <div className='settings-header__back'>
          <img src={BackIcon} alt='Back' onClick={handleBack} />
        </div>
        <div className='settings-header__title'>Millennium</div>
      </div>
      <form className='settings-form'>
        {flashCardsData.map((data, index) => {
          const { number } = data
          return (
            <div key={index} className='settings-form__inner'>
              <h2>{number}</h2>
              <div>
                <label htmlFor='obraz'>Obraz</label>
                <input type='text' id='obraz' />
              </div>
            </div>
          )
        })}
        <button onClick={handleNavigate}>Boshlash</button>
      </form>
    </div>
  </div>
  )
}

export default SettingsMillennium
