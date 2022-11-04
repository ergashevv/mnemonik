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
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={BackIcon} alt="Back" onClick={handleBack} />
          </div>
          <div className="settings-header__title">Playing Cards</div>
        </div>
        <form className="settings-form">
          <SelectStartTime time={5} />

          <label>Select cards</label>
          <select onChange={handleCursorW} defaultValue={cursorW ?? 3}>  {/* || ni o'rniga ?? yozdim */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>

          <label>Select navigation</label>
          <select defaultValue={navigation} onChange={handleNavigation}>
            <option value="left">Left to right</option>
            <option value="right">Right to left</option>
          </select>

          <label>Show cards</label>
          <select defaultValue={show} onChange={handleShow}>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>

          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}
export default Settings
