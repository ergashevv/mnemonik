import classNames from "classnames"
import { Link } from "react-router-dom"
import LeftNumber from "../../components/left-numbers"
import NavigationBtn from "../../components/numbers-components/navigation-buttons-game"
import StartGameModal from "../../components/start-game"
import Tabs from "../../components/tabs"
import TimerComponent from "../../components/timer"
import { useHomeContext } from "../../context/home-context"
import "./numbers-page.scss"

function sliceIntoChunks<T>(arr: T[], chunkSize: number) {
  const res = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    res.push(chunk)
  }
  return res
}

const NumbersGame = () => {
  const {
    cursorW,
    setTab,
    cursor,
    randomNumbers,
    tab,
    dynamic,
    setCursor,
    startTime,
    line,
    timerForRecall,
  } = useHomeContext()

  const finishGame = () => {
    setTab(0)
  }

  const indexes = sliceIntoChunks(
    Array(760)
      .fill(undefined)
      .map((_, i) => i),
    Number(cursorW)
  )

  const handleChangeCursor = (index: number) => {
    const resultIndex = indexes.findIndex((indexes) => indexes.includes(index))

    setCursor(resultIndex * Number(cursorW))
  }

  return (
    <>
      {Number(startTime) > 0 ? (
        <StartGameModal time={String(startTime)} />
      ) : (
        <div className="game container">
          <div className="navbar-header">
            <TimerComponent
              finishTimeFunc={finishGame}
              time={timerForRecall}
              navigateTo={"/numbers/start"}
            />
            <Link className="finish-now-btn" to="/numbers/start">
              Hoziroq tugatish
            </Link>
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
                              onClick={() => handleChangeCursor(k)}
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
