import { useHomeContext } from "../../context/home-context"

const LeftNumber = () => {
  const { tab } = useHomeContext()

  return (
    <>
      {Array(Math.floor(40))
        .fill(null)
        .map((_, index) => (
          <div key={index}>
            {tab === 0 && index < 10 ? (
              <span className="num-or">{index + 1})</span>
            ) : null}
            {tab === 1 && index > 9 && index < 20 ? (
              <span className="num-or">{index + 1})</span>
            ) : null}
            {tab === 2 && index > 19 && index < 30 ? (
              <span className="num-or">{index + 1})</span>
            ) : null}
            {tab === 3 && index > 29 && index <= 40 ? (
              <span className="num-or">{index + 1})</span>
            ) : null}
          </div>
        ))}
    </>
  )
}
export default LeftNumber
