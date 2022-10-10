import { Link } from "react-router-dom"
import { useHomeContext } from "../../context/home-context"

const DatesSettings = () => {
  const { setStartTime } = useHomeContext()
  return (
    <>
      <form action="">
        <h2>Enter time</h2>
        <input
          onChange={(e) => setStartTime(Number(e.target.value))}
          type="number"
        />
      </form>
      <Link to="/dates/game">Start</Link>
    </>
  )
}
export default DatesSettings
