import React, { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../../context/flash-cards-context'

const SystemSettings = () => {
  const { flashCardSections, setFlashCardSections } = useFlashCardsContext()

  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFlashCardSections(e.target.value)
  }

  const handleNavigate = () => {
    navigate(`/flash-cards/settings/systems/${flashCardSections}`)
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
          <div className='settings-header__title'>Tizim Yaratish</div>
        </div>
        <form className='settings-form'>
          <label>Tizim sozlash</label>
          <select onChange={handleChange} defaultValue={flashCardSections}>
            <option value='major'>Major</option>
            <option value='millennium'>Millennium</option>
            <option value='poa'>POA</option>
            <option value='pao'>PAO</option>
          </select>
          <button onClick={handleNavigate}>Tizim yaratish</button>
        </form>
      </div>
    </div>
  )
}

export default SystemSettings
