import { useMemo, useState } from "react"
import LeftNumber from "../../components/left-numbers"
import Tabs from "../../components/tabs"
import { useHomeContext } from "../../context/home-context"

const Result = () => {
  const [show, setShow] = useState(false)

  const {
    result,
    tab,
    cursorW,
    randomNumbers,
    dynamic: dynum,
  } = useHomeContext()

  const count = useMemo(() => {
    let count = 0
    result?.forEach((item: any, k: any) => {
      if (item !== randomNumbers.slice(dynum * tab, dynum * (tab + 1))[k])
        count++
    })

    return count
  }, [dynum, randomNumbers, result, tab])

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
          className={
            Number(cursorW) >= 4 ? "sort-numbers active" : "sort-numbers"
          }
        >
          <LeftNumber />
        </div>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              {tab === index && (
                <div
                  style={{
                    gridTemplateColumns:
                      dynum == 189
                        ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                        : "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  }}
                  className="start-game"
                >
                  {result
                    ?.slice(dynum * tab, dynum * (tab + 1))
                    .map((value: any, index) => (
                      <div key={index}>
                        <>
                          <input
                            readOnly
                            style={{
                              color:
                                value ==
                                randomNumbers.slice(
                                  dynum * tab,
                                  dynum * (tab + 1)
                                )[index]
                                  ? "green"
                                  : "red",
                              fontWeight: "bold",
                            }}
                            value={value}
                            type="text"
                          />
                          {show && (
                            <input
                              readOnly
                              value={
                                randomNumbers.slice(
                                  dynum * tab,
                                  dynum * (tab + 1)
                                )[index]
                              }
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
