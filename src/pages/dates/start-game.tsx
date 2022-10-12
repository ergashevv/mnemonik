import { Link } from "react-router-dom"
import { useDatedContext } from "../../context/date-context"
import "./main.scss"
const DatesStartGame = () => {
  const { data, even, userdate, setUserdate } = useDatedContext()
  const handleFocusOnNext = (e: any, index: number) => {
    if (e.target.value.length >= 4) {
      const nextInput = e.currentTarget?.nextSibling
      nextInput?.focus()
    }
    return setUserdate((userdate: string[]) =>
      userdate.map((input, i) => (i === index ? e.target.value : input))
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
    <>
      <Link to="/dates/result">Finish</Link>
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
                />
              ))}
          </div>
          <div className="text">
            {even.map((item, key) => (
              <p
                key={key}
                style={{
                  marginBottom: "3px",
                }}
              >
                <>
                  <span>{item}</span>
                </>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default DatesStartGame