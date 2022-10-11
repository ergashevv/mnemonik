import classNames from "classnames"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useCardsContext } from "../../context/cards-context"
import NavigationBtn from "../../assets/images/next.png"
import "./main.scss"
import StartGameModal from "../../components/numbers-components/start-game"
import { useHomeContext } from "../../context/home-context"
const CardGame = () => {
  const { startTime: starttime } = useHomeContext()
  const { data, cursor, randomcard, setCursor, cursorW, navigation, show } =
    useCardsContext()
  const parsedCursorW = parseInt(cursorW!)
  const showcards = randomcard!.slice(cursor, cursor + parsedCursorW)
  useEffect(() => {
    if (navigation === "right") {
      setCursor(data.length - parsedCursorW)
    } else {
      setCursor(0)
    }
  }, [setCursor, navigation])
  const nextNavigate = () => {
    if (navigation === "right") {
      setCursor(cursor - parsedCursorW)
    } else {
      setCursor(cursor + parsedCursorW)
    }
  }
  const prevNavigate = () => {
    if (navigation === "right") {
      setCursor(cursor + parsedCursorW)
    } else {
      setCursor(cursor - parsedCursorW)
    }
  }
  return (
    <>
      {starttime ? (
        <StartGameModal time={starttime} />
      ) : (
        <>
          <div className="container">
            <div className="show-card">
              {showcards.map((i, k) => (
                <img key={k} src={i.image} alt="" />
              ))}
            </div>
            <div className="numbers-of">
              {navigation === "right" ? (
                <>
                  <h1
                    style={{
                      color: "black",
                    }}
                  >
                    {data.length}
                  </h1>
                  <h1>/{data.length - cursor}</h1>
                </>
              ) : (
                <>
                  <h1>{cursor + parsedCursorW}</h1>
                  <h1>/ {data.length}</h1>
                </>
              )}
            </div>
            <div className="cards">
              {randomcard!.map((item, key) => (
                <div
                  className={classNames("card", {
                    active: key >= cursor && key < cursor + parsedCursorW,
                  })}
                  key={key}
                >
                  <img
                    style={{
                      marginRight: show === "small" ? "-80px" : "-30px",
                    }}
                    src={item.image}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="d-flex btn-navigation">
              <button
                disabled={
                  navigation === "right"
                    ? cursor >= data.length - parsedCursorW
                    : cursor <= 0
                }
                onClick={prevNavigate}
              >
                <img width="100px" src={NavigationBtn} alt="" />
              </button>
              <button
                disabled={
                  navigation === "right"
                    ? cursor <= 0
                    : cursor >= data.length - parsedCursorW
                }
                onClick={nextNavigate}
              >
                <img width="100px" src={NavigationBtn} alt="next" />
              </button>
            </div>
          </div>
          <Link to="/cards/start">Start</Link>
        </>
      )}
    </>
  )
}
export default CardGame
