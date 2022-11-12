import { useFlashCardsContext } from '../../context/FlashCardsContext'
import './FlashCards.scss'

const MajorResult = () => {
  const { timeMajor, shuffledMajor } = useFlashCardsContext()

  return (
    <div className='flashCards'>
      <div className='container'>
        <div className='flashCards-result'>
          <div className='flashCards-result__card-numbers'>
            {shuffledMajor.map((el: any, index: number) => {
              const { majorNumber } = el
              return (
                <div key={index}>{majorNumber < 10 ? `0${majorNumber}` : majorNumber}- card</div>
              )
            })}
          </div>
          <div className='flashCards-result__card-time'>
            {timeMajor.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s time spent</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MajorResult
