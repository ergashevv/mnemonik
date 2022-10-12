import classNames from "classnames"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import LeftNumber from "../../components/left-numbers"
import NavigationBtn from "../../components/numbers-components/navigation-buttons-game"
import StartGameModal from "../../components/numbers-components/start-game"
import Tabs from "../../components/tabs"
import TimerComponent from "../../components/timer"
import { useHomeContext } from "../../context/home-context"
import "./main.scss"

const NumbersGame = () => {
  const {
    cursorW: cursorWidth,
    cursor,
    randomNumbers,
    tab,
    dynum,
    startTime: starttime,
    line,
  } = useHomeContext()

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
                <LeftNumber />
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
            <Tabs tabnumber={4} />
          </div>
          <NavigationBtn />
        </div>
      )}
    </>
  )
}

export default NumbersGame
