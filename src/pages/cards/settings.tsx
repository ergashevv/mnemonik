import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/styles/StartStyles.scss'
import SelectStartTime from '../../components/start-game-select'
import { useCardsContext } from '../../context/cards-context'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useHomeContext } from '../../context/home-context'

const Settings = () => {
  const { setNavigation, navigation, setShow, show } = useCardsContext()
  const { cursorW, setCursorW } = useHomeContext()

  const navigate = useNavigate()

  const handleCursorW = (e: ChangeEvent<HTMLSelectElement>) => {
    setCursorW(e.target.value)
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigation(e.target.value)
  }

  const handleShow = (e: ChangeEvent<HTMLSelectElement>) => {
    setShow(e.target.value)
  }

  const handleNavigate = () => {
    navigate('/cards/game')
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Playing Cards</div>
        </div>
        <form className='settings-form'>
          {/* <label>Tayyorgarlik vaqti</label> */}
          <SelectStartTime time={5} />

          <label>Select cards</label>
          <select onChange={handleCursorW} defaultValue={cursorW ?? '2'}>
            {' '}
            {/* || ni o'rniga ?? yozdim */}
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>

          <label>Ko'rsatkichni tanlash</label>
          <select defaultValue={navigation} onChange={handleNavigation}>
            <option value='left'>Chapdan o'ngga</option>
            <option value='right'>O'ngdan chapga</option>
          </select>

          <label>Kartalarning ko'rinishi</label>
          <select defaultValue={show} onChange={handleShow}>
            <option value='small'>Kichkina</option>
            <option value='large'>Uzun</option>
          </select>

          <button onClick={handleNavigate}>Boshlash</button>
        </form>
      </div>
    </div>
  )
}
export default Settings
