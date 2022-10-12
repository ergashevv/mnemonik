import { ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useHomeContext } from "../../context/home-context"

const FlashCardsStart = () => {
  const { setStartTime } = useHomeContext()

  const navigate = useNavigate()

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(+e.target.value)
  }

  const handleNavigate = () => {
    navigate("/flash-cards/recall")
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
          <button onClick={handleNavigate}>Start</button>
        </form>
      </div>
    </div>
  )
}

export default FlashCardsStart
