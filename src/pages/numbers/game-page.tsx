import classNames from "classnames"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import NavigationBtn from "../../components/numbers-components/navigation-buttons-game"
import StartGameModal from "../../components/numbers-components/start-game"
import { useHomeContext } from "../../context/home-context"
import "./main.scss"

const NumbersGame = () => {
  const {
    cursorW: cursorWidth,
    cursor,
    randomNumbers,
    tab,
    setCursor,
    dynum,
    setTab,
    starttime,
    line,
  } = useHomeContext()

  const resetCursor = (index: number) => {
    setCursor(0)
    setTab(index)
  }

  const [seconds, setSeconds] = useState<number>(120)

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setSeconds(seconds - 1), 1000)
  }, [seconds])

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    }

    if (seconds < 0) {
      navigate("/start")
    }
  })

  const screenCountdownStyle = {
    display: seconds >= 0 ? "flex" : "none",
    justifyContent: "space-between",
  }

  const lineNumbers = Array(Math.floor(40))
    .fill(null)
    .map((_, index) => (
      <>
        {tab === 0 && index < 10 && <span>{index + 1})</span>}
        {tab === 1 && index > 9 && index < 20 && <span>{index + 1})</span>}
        {tab === 2 && index > 19 && index < 30 && <span>{index + 1})</span>}
        {tab === 3 && index > 29 && index <= 40 && <span>{index + 1})</span>}
      </>
    ))

  return (
    <>
      {starttime ? (
        <StartGameModal time={starttime} />
      ) : (
        <div className="game container">
          <div style={screenCountdownStyle}>
            <span>{seconds} s</span>
            <Link to="/numbers/start">Start</Link>
          </div>
          <div className="header">
            <div className="num">
              <div
                className={
                  Number(cursorWidth) >= 4 ? "sort-num active" : "sort-num"
                }
              >
                {lineNumbers}
              </div>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <>
                    {tab === index && (
                      <div
                        style={{
                          gridTemplateColumns:
                            Number(cursorWidth) === 3
                              ? "repeat(21, 1fr)"
                              : "repeat(20, 1fr)",
                        }}
                        className={`cards`}
                      >
                        {randomNumbers
                          .slice(dynum * tab, dynum * (tab + 1))
                          .map((i, k) => (
                            <div
                              key={k}
                              className={
                                (k + 1) % parseInt(line!) === 0
                                  ? "active card"
                                  : "card"
                              }
                            >
                              <div
                                className={classNames("card-number", {
                                  active:
                                    k >= cursor &&
                                    k < cursor + parseInt(cursorWidth!),
                                })}
                              >
                                <p>{i}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="tabs">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <button
                  className={tab === index ? "active" : undefined}
                  onClick={() => resetCursor(index)}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
          </div>
          <NavigationBtn />
        </div>
      )}
    </>
  )
}

export default NumbersGame
