import { useState, useCallback } from "react"
import { Card, useCardsContext } from "../../context/cards-context"

import "./main.scss"
const ResultCard = () => {
  const { inputs, randomcard } = useCardsContext()
  const [show, setShow] = useState(false)

  return (
    <>
      {
        <div className="empty">
          {inputs?.map((item: Card, index: number) => (
            <div
              onClick={() => setShow(!show)}
              style={{
                background: item.id !== randomcard![index].id ? "red" : "black",
              }}
              key={index}
              className={"empty-card"}
            >
              {show ? (
                <img width="50px" src={randomcard![index].image} alt="" />
              ) : (
                <img width="50px" src={item.image} alt="" />
              )}
            </div>
          ))}
        </div>
      }
    </>
  )
}
export default ResultCard
