import { useFlashCardsContext } from '../../../context/flash-cards-context'
import '../flash-cards.scss'

const PaoResult = () => {
  const { timePao, shuffledPao } = useFlashCardsContext()
  const sliceTime = timePao.slice(0, shuffledPao.length)

  return (
    <div className='flashCards'>
      <div className='container'>
        <div className='flashCards-result'>
          <div className='flashCards-result__card-numbers'>
            {shuffledPao.map((el: any, index: number) => {
              const { paoNumber } = el
              return <div key={index}>{paoNumber < 10 ? `0${paoNumber}` : paoNumber} - card</div>
            })}
          </div>
          <div className='flashCards-result__card-time'>
            {sliceTime.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaoResult
