import { useHomeContext } from '../../context/home-context'
import './main.scss'
const LeftNumber = () => {
  const { tab } = useHomeContext()

  return (
    <div className='left-numbers'>
      <div className='inner-child'>
        {Array(Math.floor(38))
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              {tab === 0 && index < 10 && <span className='num-or'>{index + 1}</span>}
              {tab === 1 && index > 9 && index < 20 && <span className='num-or'>{index + 1}</span>}
              {tab === 2 && index > 19 && index < 30 && <span className='num-or'>{index + 1}</span>}
              {tab === 3 && index > 29 && index <= 40 && (
                <span className='num-or'>{index + 1}</span>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
export default LeftNumber
