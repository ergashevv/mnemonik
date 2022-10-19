import { ChangeEvent } from "react"
import { useNavigate } from "react-router"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const WordsStart = () => {
  const { setCurrentPage } = useNamesAndFacesContext()
  const { setStartTime } = useHomeContext()

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate("/words/recall")
    setCurrentPage(1)
  }

  const handleStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value)
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

export default WordsStart
