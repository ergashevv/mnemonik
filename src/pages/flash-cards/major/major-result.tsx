import { useFlashCardsContext } from '../../../context/flash-cards-context'
import '../flash-cards.scss'

const MajorResult = () => {
  const { timeMajor, shuffledMajor } = useFlashCardsContext()

  const slicedTime = timeMajor.slice(0, shuffledMajor.length)

  return (
    <div className='flashCards'>
      <div className='container'>
        <div className='flashCards-result'>
          <div className='flashCards-result__card-numbers'>
            {shuffledMajor?.map((el: any, index: number) => {
              const { majorNumber } = el
              return (
                <div key={index}>{majorNumber < 10 ? `0${majorNumber}` : majorNumber} - card</div>
              )
            })}
          </div>
          <div className='flashCards-result__card-time'>
            {slicedTime.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MajorResult
