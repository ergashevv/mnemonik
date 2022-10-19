import classNames from "classnames"
import { Link } from "react-router-dom"
import LeftNumber from "../../components/left-numbers"
import NavigationBtn from "../../components/numbers-components/navigation-buttons-game"
import StartGameModal from "../../components/numbers-components/start-game"
import Tabs from "../../components/tabs"
import TimerComponent from "../../components/timer"
import { useHomeContext } from "../../context/home-context"
import "./main.scss"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const NumbersGame = () => {
  const {
    cursorW,
    cursor,
    randomNumbers,
    tab,
    dynamic,
    startTime,
    line,
  } = useHomeContext()

  const { timerForRecall } = useNamesAndFacesContext()

  return (
    <>
      {startTime ? (
        <StartGameModal time={startTime} />
      ) : (
        <div className="game container">
          <div
            style={{
              justifyContent: "space-between",
            }}
            className="d-flex"
          >
            <TimerComponent time={timerForRecall} navigateTo={"/numbers/start"} />
            <Link to="/numbers/start">Start</Link>
          </div>
          <div className="header">
            <div className="num">
              <div
                className={
                  Number(cursorW) >= 4 ? "sort-num active" : "sort-num"
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
                            Number(cursorW) === 3
                              ? "repeat(21, 1fr)"
                              : "repeat(20, 1fr)",
                        }}
                        className={`cards`}
                      >
                        {randomNumbers
                          .slice(dynamic * tab, dynamic * (tab + 1))
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
                                    k < cursor + parseInt(cursorW!),
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
            <Tabs tabNumber={4} />
          </div>
          <NavigationBtn />
        </div>
      )}
    </>
  )
}

export default NumbersGame
