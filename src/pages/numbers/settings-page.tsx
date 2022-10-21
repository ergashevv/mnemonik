import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import SelectStartTime from "../../components/start-game-select"
import { useHomeContext } from "../../context/home-context"
import ArrowLeft from "../../assets/images/icons/arrow-left.svg"

const SettingsPage = () => {
  const {
    setCursorW,
    cursorW,
    setLine,
    line,
    navigation,
    setNavigation,
    autoSecond,
    setAutoSecond,
  } = useHomeContext()

  console.log(autoSecond, "auto")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCursorW(e.target.value)
  }

  const navigate = useNavigate()

  const handleLine = (e: ChangeEvent<HTMLInputElement>) => {
    setLine(+e.target.value)
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigation(e.target.value)
  }
  console.log(navigation)

  const handleAutoSecond = (e: ChangeEvent<HTMLInputElement>) => {
    setAutoSecond(+e.target.value)
  }

  const handleNavigate = () => {
    navigate("/numbers/game")
  }

  const handleBack = () => {
    navigate("/")
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={ArrowLeft} alt="Back" onClick={handleBack} />
          </div>
          <div className="settings-header__title">Raqamlar</div>
        </div>
        <form className="settings-form">
          <div className="settings-form__wrapper">
            <div>
              <label>Kursor kengligi</label>
              <input
                pattern="[0-9]*"
                onChange={handleChange}
                value={cursorW}
                type="number"
              />
            </div>

            <div>
              <label>Ajratuvchi chiziqlar</label>
              <input
                pattern="[0-9]*"
                onChange={handleLine}
                value={line}
                type="number"
              />
            </div>
          </div>

          <label>Tayyorgarlik vaqti</label>
          <SelectStartTime time={5} />

          <label>O'tish vaqti</label>
          <select
            className="select"
            defaultValue={autoSecond}
            onChange={handleNavigation}
          >
            <option className="option" value="custom">
              Custom
            </option>
            <option className="option" value="auto">
              Auto
            </option>
          </select>
          {navigation === "auto" ? (
            <div>
              <label>Avtomatik o'tish vaqti</label>
              <h3>Vaqt: {Number(autoSecond) / 2}s</h3>
              <input
                value={autoSecond}
                onChange={handleAutoSecond}
                max={10}
                type="range"
              />
            </div>
          ) : null}
          <button onClick={handleNavigate} disabled={parseInt(cursorW!) < 1}>
            Boshlash
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage
