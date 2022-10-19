import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import { useHomeContext } from "../../context/home-context"

const SettingsPage = () => {
  const {
    setCursorW,
    cursorW,
    line,
    setLine,
    navigation,
    setNavigation,
    autoSecond,
    setAutoSecond,
    setStartTime,
  } = useHomeContext()


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCursorW(event.target.value)
  }

  const navigate = useNavigate()

  const handleLine = (e: ChangeEvent<HTMLInputElement>) => {
    setLine(+e.target.value)
  }

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigation(+e.target.value)
  }

  const handleAutoSecond = (e: ChangeEvent<HTMLInputElement>) => {
    setAutoSecond(+e.target.value)
  }

  const handleNavigate = () => {
    navigate("/numbers/game")
  }

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(+e.target.value)
  }

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
          <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
          <input
            type="number"
            onChange={handleStartTime}
            placeholder="Standart vaqt 5 soniya"
          />

          <label htmlFor="">Change cursor numbers</label>
          <input
            pattern="[0-9]*"
            value={cursorW}
            onChange={handleChange}
            type="number"
            placeholder="Enter number"
          />

          <label>Enter line number</label>
          <input
            pattern="[0-9]*"
            value={line}
            onChange={handleLine}
            type="number"
            placeholder="Enter number"
          />

          <label>Select navigation</label>
          <select
            defaultValue={"custom"}
            onChange={handleNavigation}
            name=""
            id=""
          >
            <option value="custom">Custom</option>
            <option value="auto">Auto</option>
          </select>
          {navigation === "auto" ? (
            <div>
              <label>Enter auto navigate second</label>
              <input
                value={autoSecond}
                onChange={handleAutoSecond}
                pattern="[0-9]*"
                type=" number"
              />
            </div>
          ) : null}
          <button onClick={handleNavigate} disabled={parseInt(cursorW!) < 1}>
            Start
          </button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPage
