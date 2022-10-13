import { useFlashCardsContext } from "../../context/FlashCardsContext"
import "./FlashCards.scss"

const FlashCardsResult = () => {

  const { time, flashCards } = useFlashCardsContext()

  return (
    <div className="flashCards">
      <div className="container">
        <div className="flashCards-result">
          <div className="flashCards-result__card-numbers">
            {flashCards.map((_, index) => {
              return <div key={index}>{index + 1} - card</div>
            })}
          </div>
          <div className="flashCards-result__card-time">
            {time.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s time spent</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCardsResult
