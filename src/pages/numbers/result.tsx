import { useMemo, useState } from "react"
import Tabs from "../../components/tabs"
import { useHomeContext } from "../../context/home-context"

const Result = () => {
  const [show, setShow] = useState(false)

  const { result, tab, randomNumbers, dynamic } = useHomeContext()

  const count = useMemo(() => {
    let count = 0
    result?.forEach((item: any, k: any) => {
      if (item !== randomNumbers[k]) count++
    })

    return count
  }, [randomNumbers, result])

  return (
    <>
      <span
        style={{
          display: "block",
          marginBottom: "6px",
        }}
      >
        {" "}
        Umumiy {randomNumbers.length}
      </span>
      <span
        style={{
          display: "block",
          marginBottom: "6px",
        }}
      >
        {" "}
        To'g'ri javoblar {randomNumbers.length - count}
      </span>
      <span> Xato javoblar {count}</span>
      <div className="d-flex result-card">
        <div
          style={{
            marginRight: "4px",
          }}
        >
          {Array(Math.floor(40))
            .fill(null)
            .map((_, index) => (
              <div className="result-num-or" key={index}>
                {tab === 0 && index < 10 ? (
                  <span className={show ? "num-or active" : "num-or"}>
                    {index + 1})
                  </span>
                ) : null}
                {tab === 1 && index > 9 && index < 20 ? (
                  <span className={show ? "num-or active" : "num-or"}>
                    {index + 1})
                  </span>
                ) : null}
                {tab === 2 && index > 19 && index < 30 ? (
                  <span className={show ? "num-or active" : "num-or"}>
                    {index + 1})
                  </span>
                ) : null}
                {tab === 3 && index > 29 && index <= 40 ? (
                  <span className={show ? "num-or active" : "num-or"}>
                    {index + 1})
                  </span>
                ) : null}
              </div>
            ))}
        </div>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              {tab === index && (
                <div
                  style={{
                    gridTemplateColumns:
                      dynamic == 189
                        ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                        : "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  }}
                  className="start-game"
                >
                  {result
                    ?.slice(dynamic * tab, dynamic * (tab + 1))
                    .map((value: any, index) => (
                      <div key={index}>
                        <>
                          <input
                            readOnly
                            style={{
                              color:
                                value == randomNumbers[index] ? "green" : "red",
                              fontWeight: "bold",
                            }}
                            value={value}
                            type="text"
                          />
                          {show && (
                            <input
                              readOnly
                              value={randomNumbers[index]}
                              type="text"
                            />
                          )}
                        </>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="tabs">
        <Tabs tabNumber={4} />
      </div>
      <button onClick={() => setShow(!show)}>
        {show ? "user result" : "show result"}
      </button>
    </>
  )
}
export default Result
