import { useState } from 'react'
import { Card, useCardsContext } from '../../context/cards-context'
import './cards-page.scss'

const ResultCard = () => {
  const { inputs, randomCard } = useCardsContext()
  const [show, setShow] = useState(false)

  return (
    <>
      {
        <div className="empty">
          {inputs?.map((item: Card, index: number) => (
            <div
              onClick={() => setShow(!show)}
              style={{
                background: item.id !== randomCard![index].id ? 'red' : 'black'
              }}
              key={index}
              className={'empty-card'}
            >
              {show
                ? (
                <img width="50px" src={randomCard![index].image} alt="" />
                  )
                : (
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
