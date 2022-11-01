import { useState } from 'react'
import { Card, useCardsContext } from '../../context/cards-context'
import './cards-page.scss'

const ResultCard = () => {
  const { inputs, randomCard } = useCardsContext()
  const [show, setShow] = useState(false)

  return (
    <div
    style={{
      textAlign: "center"
    }}
    className='container'>
      <h1
      style={{
        marginBottom: "20px"
      }}
      >Your Result</h1>
      {
        <div className="result-cards">
          {inputs?.map((item: Card, index: number) => (
            <div
              onClick={() => setShow(!show)}
              style={{
                borderRadius: "7px",
                padding: "3px",
                background: item.id !== randomCard![index].id ? "red" : "",
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
    </div>
  )
}
export default ResultCard
