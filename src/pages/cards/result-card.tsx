import { useState } from "react"
import { Card, useCardsContext } from "../../context/cards-context"
import "./cards-page.scss"

const ResultCard = () => {
  const { inputs, randomCard } = useCardsContext()
  const [show, setShow] = useState(false)

  return (
    <>
      {
        <div className="result-cards">
          {inputs?.map((item: Card, index: number) => (
            <div
              onClick={() => setShow(!show)}
              style={{
                borderRadius: "7px",
                boxShadow: `0px 0px 10px 1px #007, 1px 1px ${
                  item.id !== randomCard![index].id ? "#fff" : "#007"
                } inset`,
              }}
              key={index}
              className={"empty-card"}
            >
              {show ? (
                <img width="50px" src={randomCard![index].image} alt="" />
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
