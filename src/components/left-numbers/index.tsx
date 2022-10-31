import { useHomeContext } from '../../context/home-context'
import './main.scss'
const LeftNumber = () => {
  const { tab } = useHomeContext()

  return (
    <div className="left-numbers">
      {Array(Math.floor(38))
        .fill(null)
        .map((_, index) => (
          <div className="inner-child" key={index}>
            {tab === 0 && index < 10
              ? (
              <span className="num-or">{index + 1}</span>
                )
              : null}
            {tab === 1 && index > 9 && index < 20
              ? (
              <span className="num-or">{index + 1}</span>
                )
              : null}
            {tab === 2 && index > 19 && index < 30
              ? (
              <span className="num-or">{index + 1}</span>
                )
              : null}
            {tab === 3 && index > 29 && index <= 40
              ? (
              <span className="num-or">{index + 1}</span>
                )
              : null}
          </div>
        ))}
    </div>
  )
}
export default LeftNumber
