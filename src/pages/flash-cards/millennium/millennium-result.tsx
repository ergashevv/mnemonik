import { useFlashCardsContext } from '../../../context/flash-cards-context'
import '../flash-cards.scss'

interface IMillennium {
  millenniumNumber: number
  millenniumObraz: string
}

const MillenniumResult = () => {
  const { timeMillennium, shuffledMillennium, hundreds } = useFlashCardsContext()

  const slicedTime = timeMillennium.slice(0, shuffledMillennium.length)

  return (
    <div className='flashCards'>
      <div className='container'>
        <div className='flashCards-result'>
          <div className='flashCards-result__card-numbers'>
            {shuffledMillennium.map((el: IMillennium, index: number) => {
              const { millenniumNumber } = el
              return (
                <div key={index + Number(hundreds)}>
                  {millenniumNumber + Number(hundreds) < 10
                    ? `00${millenniumNumber + Number(hundreds)}`
                    : millenniumNumber + Number(hundreds) >= 10 &&
                      millenniumNumber + Number(hundreds) < 100
                    ? `0${millenniumNumber + Number(hundreds)}`
                    : millenniumNumber + Number(hundreds)}{' '}
                  - card
                </div>
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

export default MillenniumResult
