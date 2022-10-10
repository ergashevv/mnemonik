import { Card, useCardsContext } from "../../context/cards-context"

import "./main.scss"
const ResultCard = () => {
  const { inputs, randomcard } = useCardsContext()
  return (
    <>
      {
        <div className="empty">
          {inputs?.map((item: Card, index: number) => (
            <div
              style={{
                background: item.id !== randomcard![index].id ? "red" : "black",
              }}
              key={index}
              className={"empty-card"}
            >
              <img width="50px" src={item.image} alt="" />
            </div>
          ))}
        </div>
      }
    </>
  )
}
export default ResultCard
