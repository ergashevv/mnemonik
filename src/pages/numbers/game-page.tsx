import classNames from "classnames"
import { Link } from "react-router-dom"
import LeftNumber from "../../components/left-numbers"
import NavigationBtn from "../../components/numbers-components/navigation-buttons-game"
import StartGameModal from "../../components/start-game"
import Tabs from "../../components/tabs"
import TimerComponent from "../../components/timer"
import { useHomeContext } from "../../context/home-context"
import "./numbers-page.scss"

const NumbersGame = () => {
  const {
    cursorW,
    setTab,
    cursor,
    randomNumbers,
    tab,
    dynamic,
    startTime,
    line,
  } = useHomeContext()
  const finishGame = () => {
    setTab(0)
  }
  return (
    <>
      {Number(startTime) > 0 ? (
        <StartGameModal time={String(startTime)} />
      ) : (
        <div className="game container">
          <div
            style={{
              justifyContent: "space-between",
            }}
            className="d-flex game-header"
          >
            <TimerComponent
              finishTimeFunc={finishGame}
              time={5}
              navigateTo={"/numbers/start"}
            />
            <Link to="/numbers/start">Hoziroq tugatish</Link>
          </div>
          <div className="game-header-inner">
            <div className="numbers">
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
                  <>
                    {tab === index && (
                      <div className={`cards`}>
                        {randomNumbers
                          .slice(dynamic * tab, dynamic * (tab + 1))
                          .map((i, k) => (
                            <div
                              key={k}
                              className={
                                (k + 1) % parseInt(line!) === 0
                                  ? "active number-card"
                                  : "number-card"
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
          <NavigationBtn />
          <div className="tabs">
            <Tabs tabNumber={4} />
          </div>
        </div>
      )}
    </>
  )
}

export default NumbersGame
