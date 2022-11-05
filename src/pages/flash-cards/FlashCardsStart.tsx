import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import SelectStartTime from '../../components/start-game-select'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

const FlashCardsStart = () => {
  const {
    navigationFlashCards,
    autoSecondFlashCards,
    setNavigationFlashCards,
    setAutoSecondFlashCards,
  } = useFlashCardsContext()
  
  const [value, setValue] = useState<string>(() => JSON.parse(localStorage.getItem('value')!))

  useEffect(() => {
    if (!value) {
      setValue('major')
    }
    if (value) {
      localStorage.setItem('value', JSON.stringify(value))
    }
  }, [value])

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/flash-cards/settings/${value}`)
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigationFlashCards(e.target.value)
  }

  const handleAutoSecond = (e: ChangeEvent<HTMLInputElement>) => {
    setAutoSecondFlashCards(+e.target.value)
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
        <form className='settings-form'>
          <SelectStartTime time={5} />

          <label>Karta tanlash</label>
          <select onChange={handleChange} defaultValue={value}>
            <option value='major'>Major</option>
            <option value='millennium'>Millennium</option>
            <option value='poa'>POA</option>
          </select>

          <label>Select navigation</label>
          <select
            defaultValue={navigationFlashCards === 'auto' ? 'auto' : 'custom'}
            onChange={handleNavigation}
          >
            <option value='custom'>Custom</option>
            <option value='auto'>Auto</option>
          </select>
          {navigationFlashCards === 'auto' ? (
            <div>
              <label>Avtomatik o'tish vaqti</label>
              <h3>Vaqt: {Number(autoSecondFlashCards) / 10}s</h3>
              <input
                value={autoSecondFlashCards}
                onChange={handleAutoSecond}
                max={50}
                type='range'
              />
            </div>
          ) : null}
          <button onClick={handleNavigate}>Boshlash</button>
        </form>
      </div>
    </div>
  )
}

export default FlashCardsStart
