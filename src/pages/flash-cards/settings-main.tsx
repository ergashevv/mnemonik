import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import SelectStartTime from '../../components/start-game-select'

const SettingsMain = () => {
  const {
    navigationFlashCards,
    autoSecondFlashCards,
    setNavigationFlashCards,
    setAutoSecondFlashCards,
    flashCardSections,
    setFlashCardSections,
    hundreds,
    setHundreds,
    setCurrentFlashCard,
  } = useFlashCardsContext()

  const [allMajor] = useState(JSON.parse(localStorage.getItem('allMajor')!))
  const [allMillennium] = useState(JSON.parse(localStorage.getItem('allMillennium')!))
  const [poa] = useState(JSON.parse(localStorage.getItem('poa')!))
  const [pao] = useState(JSON.parse(localStorage.getItem('pao')!))

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings')
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigationFlashCards(e.target.value)
  }

  const handleAutoSecond = (e: ChangeEvent<HTMLInputElement>) => {
    setAutoSecondFlashCards(+e.target.value)
  }

  const handleNavigate = (e: any) => {
    e.preventDefault()

    if (
      (allMajor && flashCardSections === 'major') ||
      (allMillennium && flashCardSections === 'millennium') ||
      (poa && flashCardSections === 'poa') ||
      (pao && flashCardSections === 'pao')
    ) {
      navigate(`/flash-cards/${flashCardSections}/memorization`)
    } else {
      alert('Iltimos obraz yarating!')
      setTimeout(() => {
        navigate(`/flash-cards/settings/systems/${flashCardSections}`)
      }, 1000)
    }

    setCurrentFlashCard(1)
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFlashCardSections(e.target.value)
  }

  const handleHundredsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setHundreds(e.target.value)
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
          <label>Tizim tanlash</label>
          <select
            onChange={handleChange}
            defaultValue={
              flashCardSections === 'major'
                ? 'major'
                : flashCardSections === 'millennium'
                ? 'millennium'
                : flashCardSections === 'poa'
                ? 'poa'
                : 'pao'
            }
          >
            <option value='major'>Major</option>
            <option value='millennium'>Millennium</option>
            <option value='poa'>POA</option>
            <option value='pao'>PAO</option>
          </select>
          {flashCardSections === 'millennium' ? (
            <div>
              <label>Yuzliklar tanlash</label>
              <select onChange={handleHundredsChange} defaultValue={hundreds}>
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
            </div>
          ) : null}

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

export default SettingsMain
