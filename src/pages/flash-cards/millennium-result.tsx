import { useState } from 'react'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import './FlashCards.scss'

const MillenniumResult = () => {
  const [hundredNumbers] = useState(JSON.parse(localStorage.getItem('hundreds')!))

  const { timeMillennium, shuffledMillennium } = useFlashCardsContext()

  return (
    <div className='flashCards'>
      <div className='container'>
        <div className='flashCards-result'>
          <div className='flashCards-result__card-numbers'>
            {shuffledMillennium.map((el: any, index: number) => {
              const { millenniumNumber } = el
              return (
                <div key={index + Number(hundredNumbers)}>
                  {millenniumNumber + Number(hundredNumbers) < 10
                    ? `00${millenniumNumber + Number(hundredNumbers)}`
                    : millenniumNumber + Number(hundredNumbers) >= 10 &&
                      millenniumNumber + Number(hundredNumbers) < 100
                    ? `0${millenniumNumber + Number(hundredNumbers)}`
                    : millenniumNumber + Number(hundredNumbers)}
                  - card
                </div>
              )
            })}
          </div>
          <div className='flashCards-result__card-time'>
            {timeMillennium.map((time, index) => {
              return <div key={index}>{time.toFixed(2)} s time spent</div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MillenniumResult
