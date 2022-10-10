import { Link } from "react-router-dom"
import { useCardsContext } from "../../context/cards-context"
import "./main.scss"
const Settings = () => {
  const { setCursorW, setNavigation, navigation, cursorW, setShow, show } =
    useCardsContext()
  return (
    <>
      <div className="container settings">
        <h1> Select cards</h1>
        <select
          onChange={(e) => setCursorW(e.target.value)}
          defaultValue={cursorW}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <div className="navigation-cards container">
        <h1>Select navigation</h1>
        <select
          defaultValue={navigation}
          onChange={(e) => setNavigation(e.target.value)}
        >
          <option value="left">Left to right</option>
          <option value="right">Right to left</option>
        </select>
        <div className="show-cards">
          <h1>Show cards</h1>
          <select defaultValue={show} onChange={(e) => setShow(e.target.value)}>
            <option value="small">small</option>
            <option value="large">large</option>
          </select>
        </div>
      </div>
      <Link to="/cards/game">start</Link>
    </>
  )
}
export default Settings
