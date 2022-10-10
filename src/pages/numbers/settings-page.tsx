import { useHomeContext } from "../../context/home-context"
import { Link } from "react-router-dom"
import "./main.scss"
const SettingsPage = () => {
  const {
    setCursorW,
    cursorW,
    line,
    setLine,
    navigation,
    setNavigation,
    autosec,
    setAutosec,
  } = useHomeContext()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCursorW(event.target.value)
  }
  return (
    <>
      <div className="setting-page container">
        <h1>Change cursor numbers</h1>
        <form className="mb-3">
          <input
            className="set-num-inp"
            pattern="[0-9]*"
            value={cursorW}
            onChange={handleChange}
            type="number"
            placeholder="Enter number"
          />
          <h2>Enter Line number</h2>
          <input
            className="set-num-inp"
            pattern="[0-9]*"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            type="number"
            placeholder="Enter number"
          />
          <h1>Select navigation</h1>
          <select
            defaultValue={"custom"}
            style={{
              margin: "20px 0",
            }}
            className="set-num-inp"
            onChange={(e) => setNavigation(e.target.value)}
            name=""
            id=""
          >
            <option value="custom">Custom</option>
            <option value="auto">Auto</option>
          </select>
          {navigation === "auto" ? (
            <>
              <h3>Enter auto navigate second</h3>
              <input
                value={autosec}
                onChange={(e) => setAutosec(e.target.value)}
                className="set-num-inp"
                pattern="[0-9]*"
                type=" number"
              />
            </>
          ) : null}
        </form>
        <button disabled={parseInt(cursorW!) < 1} className="d-flex m-0 m-auto">
          <Link to="/numbers/game">start</Link>
        </button>
      </div>
    </>
  )
}

export default SettingsPage
