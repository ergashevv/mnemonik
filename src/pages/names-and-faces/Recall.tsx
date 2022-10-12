import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import StartGameModal from "../../components/numbers-components/start-game"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import "./NF.scss"

const Recall = () => {
  const {
    people,
    currentPage,
    setCurrentPage,
    minutesForRecall,
    setMinutesForRecall,
  } = useNamesAndFacesContext()

  const { startTime } = useHomeContext()

  const [seconds, setSeconds] = useState<number>(0)
  const navigate = useNavigate()

  const { prevHandlers } = PrevPage()
  const { nextHandlers } = NextPage()

  useEffect(() => {
    setTimeout(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else if (seconds === 0) {
          if (minutesForRecall === 0) {
            navigate("/names-and-faces/answers")
          } else {
            setMinutesForRecall((minutesForRecall) => minutesForRecall - 1)
            setSeconds(59)
          }
        }
    }, 1000)
  }, [seconds, minutesForRecall, setSeconds, setMinutesForRecall, navigate])

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleNavigate = () => {
    navigate("/names-and-faces/answers")
    setCurrentPage(1)
  }

  return (
    <div className="faces">
      <div className="container">
        <StartGameModal time={startTime} />
        <div
          style={{ display: startTime > 0 ? "none" : "flex" }}
          className="faces-section"
        >
          <div className="faces-section__header">
            {minutesForRecall === 0 && seconds === 0 ? null : (
              <p className="faces-section__header-timer">
                {minutesForRecall}m {seconds < 10 ? `0${seconds}` : seconds}s
              </p>
            )}
            <p className="faces-section__header-title">Recall</p>
            <button
              onClick={handleNavigate}
              style={{ textDecoration: "none" }}
              className="faces-section__header-finish"
            >
              Finish
            </button>
          </div>
          <div className="faces-section__cards">
            {people.map((person, index) => {
              const { img, firstName, lastName } = person
              if (currentPage - 1 === index) {
                return (
                  <article key={index}>
                    <img src={img} alt={firstName} />
                    <h4>{firstName}</h4>
                    <h4>{lastName}</h4>
                  </article>
                )
              } else {
                return null
              }
            })}
          </div>
          <div className="indicator">
            <span>{currentPage}</span>/<span>{people.length}</span>
          </div>
          <div className="control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevHandlers} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextHandlers} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recall
