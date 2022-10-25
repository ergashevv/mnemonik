import { ArrowLeft, ArrowRight, Rewind } from "react-feather"
import { useNavigate } from "react-router"
import useFacesNext from "../../hooks/useFacesButton/useFacesNext"
import useFacesPrev from "../../hooks/useFacesButton/useFacesPrev"
import StartGameModal from "../../components/start-game"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import "./NF.scss"
import TimerComponent from "../../components/timer"

const Recall = () => {
  const {
    people,
    currentPageFaces,
    setCurrentPageFaces,
  } = useNamesAndFacesContext()

  const { startTime, timerForRecall } = useHomeContext()

  const navigate = useNavigate()

  const { facesPrevButton } = useFacesPrev()
  const { facesNextButton } = useFacesNext()

  const firstPage = () => {
    setCurrentPageFaces(1)
  }

  const handleNavigate = () => {
    navigate("/names-and-faces/answers")
    setCurrentPageFaces(1)
  }

  return (
    <div className="faces">
      <div className="container">
        <StartGameModal time={startTime!} />
        <div
          style={{ display: Number(startTime) > 0 ? "none" : "flex" }}
          className="faces-section"
        >
          <div className="faces-section__header">
            {Number(startTime) === 0 && (
              <TimerComponent
                time={timerForRecall}
                navigateTo={"/names-and-faces/answers"}
              />
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
              if (currentPageFaces - 1 === index) {
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
            <span>{currentPageFaces}</span>/<span>{people.length}</span>
          </div>
          <div className="control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...facesPrevButton} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...facesNextButton} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recall
