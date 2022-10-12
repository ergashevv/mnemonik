import { ChangeEvent, useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import "./NF.scss"

const Answer = () => {
  let {
    shuffledPeople,
    currentPage,
    setCurrentPage,
    firstNames,
    lastNames,
    setFirstNames,
    setLastNames,
    minutesForAnswer,
    setMinutesForAnswer,
  } = useNamesAndFacesContext()

  const { nextHandlers } = NextPage()
  const { prevHandlers } = PrevPage()

  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else if (seconds === 0) {
        if (minutesForAnswer === 0) {
          navigate("/names-and-faces/results")
        } else {
          setMinutesForAnswer((minutesForAnswer) => minutesForAnswer - 1)
          setSeconds(59)
        }
      }
    }, 1000)
  }, [minutesForAnswer, seconds, setMinutesForAnswer, setSeconds, navigate])

  const handleLastName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setLastNames((lastNames) =>
      lastNames.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setFirstNames((firstNames) =>
      firstNames.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleNavigate = () => {
    navigate("/names-and-faces/results")
    setCurrentPage(1)
  }

  return (
    <div className="faces">
      <div className="container">
        <div className="faces-section">
          <div className="faces-section__header">
            {minutesForAnswer === 0 && seconds === 0 ? null : (
              <p className="faces-section__header-timer">
                {minutesForAnswer}m {seconds < 10 ? `0${seconds}` : seconds}s
              </p>
            )}
            <p className="faces-section__header-title">Answer</p>
            <button
              onClick={handleNavigate}
              style={{ textDecoration: "none" }}
              className="faces-section__header-finish"
            >
              Finish
            </button>
          </div>
          <div className="faces-section__cards">
            {shuffledPeople?.map((shuffledPerson, index) => {
              const { img, firstName } = shuffledPerson
              if (index === currentPage - 1) {
                return (
                  <article key={index}>
                    <img src={img} alt={firstName} />
                    <form>
                      <input
                        type="text"
                        placeholder="Ism"
                        value={firstNames[index]}
                        onChange={(e) => handleFirstName(e, index)}
                      />
                      <input
                        type="text"
                        placeholder="Familiya"
                        value={lastNames[index]}
                        onChange={(e) => handleLastName(e, index)}
                      />
                    </form>
                  </article>
                )
              } else {
                return null
              }
            })}
          </div>
          <div className="indicator">
            <span>{currentPage}</span>/<span>{shuffledPeople?.length}</span>
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

export default Answer
