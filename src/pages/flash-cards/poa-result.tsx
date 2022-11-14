import { useFlashCardsContext } from '../../context/FlashCardsContext'
import './FlashCards.scss'

const PoaResult = () => {
  const { timePoa, shuffledPoa } = useFlashCardsContext()

  return (
    <div className='flashCards'>
      <div className='container'>
        <div className='flashCards-result'>
          <div className='flashCards-result__card-numbers'>
            {shuffledPoa.map((el: any, index: number) => {
              const { poaNumber } = el
              return <div key={index}>{poaNumber < 10 ? `0${index}` : poaNumber} - card</div>
            })}
          </div>
          <div className='flashCards-result__card-time'>
            {timePoa.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoaResult
