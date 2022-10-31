import { useCallback } from "react"
import { Link } from "react-router-dom"
import TimerComponent from "../../components/timer"
import { Card, useCardsContext } from "../../context/cards-context"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import "./cards-page.scss"

const StartCard = () => {
  const { data, inputs, focus, setFocus, setInputs, show } = useCardsContext()

  const { timerForAnswer } = useHomeContext()

  const handleRemove = useCallback(
    (_: any, index: number) => {
      setFocus(index)
    },
    [setFocus]
  )

  const handleAdd = useCallback(
    (val: Card[], _: any) => {
      setInputs((inputs: Card[]) =>
        inputs.map((input: any, i: number) => (i === focus ? val : input))
      )
    },
    [focus, setInputs]
  )

  return (
    <div className="container start-playing-cards">
      <div className="empty-cards">
        <div
          style={{
            justifyContent: "space-between",
          }}
          className="d-flex"
        >
          <TimerComponent time={timerForAnswer} navigateTo={"/cards/result"} />
          <Link className="finish-now-btn" to="/cards/result">
            Hoziroq tugatish
          </Link>
        </div>
        <div className="empty">
          {inputs?.map((img, index) => (
            <div
              key={index}
              onClick={() => handleRemove(img, index)}
              className={focus === index ? "empty-card active" : "empty-card"}
            >
              <img
                style={{
                  marginRight: show === "small" ? "-80px" : "-30px",
                }}
                width="50px"
                src={img.image}
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="cards-start-game">
          {data.map((item: any, key) => (
            <div
              key={key}
              onClick={() => handleAdd(item, key)}
              className={"empty-card"}
            >
              <img
                style={{
                  marginRight: show === "small" ? "-80px" : "-30px",
                }}
                src={item.image}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default StartCard
