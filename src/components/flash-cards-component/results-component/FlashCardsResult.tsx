import { useFlashCardsContext } from '../../../context/FlashCardsContext'
import './Results.css'

const Results = () => {
  const { time, flashCards } = useFlashCardsContext()
  return (
    <div className="results">
      <div className="container">
        <div className="results-section">
          <div className="results-section__card-numbers">
            {flashCards.map((_, index) => {
              return <div key={index}>{index + 1} - card</div>
            })}
          </div>
          <div className="results-section__card-time">
            {time.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s time spent</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
