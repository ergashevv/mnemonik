import { Link } from "react-router-dom"
import "./main.scss"
const HomePage = () => {
  return (
    <>
      <div className="home">
        <div className="links">
          <h1>Choose game</h1>
          <Link to="/numbers/settings">Numbers game</Link>
          <Link to="/cards/settings">Cards game</Link>
          <Link to="/dates/settings">Dates game</Link>
        </div>
      </div>
    </>
  )
}
export default HomePage
