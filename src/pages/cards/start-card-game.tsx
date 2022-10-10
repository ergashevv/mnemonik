import { useCallback } from "react"
import { Link } from "react-router-dom"
import { Card, useCardsContext } from "../../context/cards-context"

import "./main.scss"
const StartCard = () => {
  const { data, inputs, focus, setFocus, setInputs, show } = useCardsContext()
  const handleRemove = useCallback((_: any, index: number) => {
    setFocus(index)
  }, [])
  const handleAdd = useCallback(
    (val: Card[], _: any) => {
      setInputs((inputs: Card[]) =>
        inputs.map((input: any, i: number) => (i === focus ? val : input))
      )
    },
    [inputs, focus, setInputs]
  )
  return (
    <div>
      <div className="empty-cards">
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
        <div className="cards">
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
      <Link to="/cards/result">Finish</Link>
    </div>
  )
}
export default StartCard
