import { useState, useMemo } from 'react'
import { Card, useCardsContext } from '../../context/cards-context'
import './cards-page.scss'

const ResultCard = () => {
  const { inputs, randomCard } = useCardsContext()
  const [show, setShow] = useState(false)
  const count = useMemo(() => {
    let count = 0
    inputs?.forEach((item: any, k: any) => {
      if (item != randomCard![k]) {
        count++
      }
    })
    return count
  }, [])
  return (
    <div
      style={{
        textAlign: 'center',
      }}
      className='container'
    >
      <h1
        style={{
          marginBottom: '20px',
        }}
      >
        Sizning natijangiz !
      </h1>
      <div
        style={{
          marginBottom: '30px',
        }}
        className='user-result'
      >
        <span>Umumiy {randomCard!.length}</span>
        <span> To'g'ri javoblar {randomCard!.length - count}</span>
        <span> Xato javoblar {count}</span>
      </div>
      {
        <div className='result-cards'>
          {inputs?.map((item: Card, index: number) => (
            <div
              onClick={() => setShow(!show)}
              style={{
                borderRadius: '7px',
                padding: '3px',
                background: item.id !== randomCard![index].id ? 'red' : '',
              }}
              key={index}
              className={'empty-card'}
            >
              {show ? (
                <img width='50px' src={randomCard![index].image} alt='' />
              ) : (
                <img width='50px' src={item.image} alt='' />
              )}
            </div>
          ))}
        </div>
      }
    </div>
  )
}
export default ResultCard
