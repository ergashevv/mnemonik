import React, { ChangeEvent } from 'react'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useNavigate } from 'react-router'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

const SettingsMajor = () => {
  const { major, setMajor } = useFlashCardsContext()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setMajor((text) =>
      text.map((oldValue, currentIndex) => (currentIndex === index ? e.target.value : oldValue))
    )
  }

  const handleStorage = (e: any) => {
    e.preventDefault()
    localStorage.setItem('major', JSON.stringify(major))
    alert('Muvaffaqqiyatli yaratildi!')
    setTimeout(() => {
      navigate(`/flash-cards/settings/main`)
    }, 1000)
  }

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Major</div>
        </div>
        <form className='settings-form' onSubmit={handleStorage}>
          {Array(100)
            .fill('null')
            .map((_, index) => (
              <div key={index} className='settings-form__inner'>
                <h2>{index < 10 ? `0${index}` : index}</h2>
                <div>
                  <label htmlFor='major'>Obraz</label>
                  <input
                    type='major'
                    id='major'
                    name='major'
                    value={major[index].trim()}
                    onChange={(e) => handleText(e, index)}
                  />
                </div>
              </div>
            ))}
          <button className='fixed-button'>Yaratish</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsMajor
