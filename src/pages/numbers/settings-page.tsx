import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import "../../assets/styles/StartStyles.scss"
import SelectStartTime from "../../components/start-game-select"
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
  console.log(autoSecond, "auto")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCursorW(event.target.value)
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

  return (
    <div className="settings">
      <div className="container">
        <form className="settings-form">
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
          <h1>Enter memorizing time</h1>
          <SelectStartTime time={5} />
          <label>Select navigation</label>
          <select defaultValue={autoSecond} onChange={handleNavigation}>
            <option value="custom">Custom</option>
            <option value="auto">Auto</option>
          </select>
          {navigation === "auto" ? (
            <div>
              <label>Enter auto navigate second</label>
              <h2>value : {Number(autoSecond) / 2}</h2>
              <input
                value={autoSecond}
                onChange={handleAutoSecond}
                max={10}
                type="range"
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
