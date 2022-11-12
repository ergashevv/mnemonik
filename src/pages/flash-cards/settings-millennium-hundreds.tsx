import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

const SettingsMillennium = () => {
  const { hundreds, setHundreds } = useFlashCardsContext()
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setHundreds(e.target.value)
  }

  const handleBack = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handleNavigate = () => {
    navigate('/flash-cards/settings/systems/millennium/hundreds')
  }

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Millennium Hundreds</div>
        </div>
        <form className='settings-form'>
          <label>Yuzliklar tanlash</label>
          <select onChange={handleChange} defaultValue={hundreds}>
            <option value='0'>000-099</option>
            <option value='100'>100-199</option>
            <option value='200'>200-299</option>
            <option value='300'>300-399</option>
            <option value='400'>400-499</option>
            <option value='500'>500-599</option>
            <option value='600'>600-699</option>
            <option value='700'>700-799</option>
            <option value='800'>800-899</option>
            <option value='900'>900-999</option>
          </select>
          <button onClick={handleNavigate}>Yaratish</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsMillennium
