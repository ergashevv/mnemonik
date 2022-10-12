import classNames from "classnames"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import NavigationBtn from "../../components/numbers-components/navigation-buttons-game"
import StartGameModal from "../../components/numbers-components/start-game"
import TimerComponent from "../../components/timer"
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
    startTime: starttime,
    line,
  } = useHomeContext()

  const resetCursor = (index: number) => {
    setCursor(0)
    setTab(index)
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
          <TimerComponent time={70} navigateTo={"/numbers/start"} />
          <Link to="/numbers/start">Start</Link>
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
