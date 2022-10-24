import { Link } from "react-router-dom"
import TimerComponent from "../../components/timer"
import { useDatedContext } from "../../context/date-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import "./dates-page.scss"

const DatesStartGame = () => {
  const { data, even, setUserDate } = useDatedContext()

  const { timerForAnswer } = useNamesAndFacesContext()

  const handleFocusOnNext = (e: any, index: number) => {
    if (e.target.value.length >= 4) {
      const nextInput = e.currentTarget?.nextSibling
      nextInput?.focus()
    }

    return setUserDate((userDate: string[]) =>
      userDate.map((input, i) => (i === index ? e.target.value : input))
    )
  }

  const removeHandler = (e: any) => {
    if (e.target.value.length === 0) {
      if (e.key === "Backspace") {
        const prevInput = e.currentTarget?.previousSibling
        prevInput?.focus()
      }
    }
  }
  return (
    <div className="container">
      <div
        className="d-flex"
        style={{
          justifyContent: "space-between",
        }}
      >
        <TimerComponent time={timerForAnswer} navigateTo={"/dates/result"} />
        <Link to="/dates/result">Finish</Link>
      </div>
      <div className="start-date-game">
        <div className="inputs">
          <div className="inp">
            {Array(data.length)
              .fill(null)
              .map((_, index) => (
                <input
                  pattern="[0-9]*"
                  onKeyUp={(e) => removeHandler(e)}
                  onChange={(e) => handleFocusOnNext(e, index)}
                  type="number"
                  key={index}
                />
              ))}
          </div>
          <div className="text">
            {even.map((item, key) => (
              <p key={key}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default DatesStartGame
