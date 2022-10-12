import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import { useCardsContext } from "../../context/cards-context"
import { useHomeContext } from "../../context/home-context"

const Settings = () => {
  const {
    setCursorW,
    setNavigation,
    navigation,
    cursorW,
    setShow,
    show,
  } = useCardsContext()

  const { setStartTime } = useHomeContext()

  const navigate = useNavigate()

  const handleCursorW = (e: ChangeEvent<HTMLSelectElement>) => {
    setCursorW(e.target.value)
  }

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(+e.target.value)
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigation(e.target.value)
  }

  const handleShow = (e: ChangeEvent<HTMLSelectElement>) => {
    setShow(e.target.value)
  }

  const handleNavigate = () => {
    navigate("/cards/game")
  }

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label>Select cards</label>
          <select onChange={handleCursorW} defaultValue={cursorW}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>

          <input onChange={handleStartTime} type="number" />
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