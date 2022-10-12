import { useDatedContext } from "../../context/date-context"
import classNames from "classnames"
import "./main.scss"
import { Link } from "react-router-dom"
import NavigationBtnImg from "../../assets/images/next.png"
import StartGameModal from "../../components/numbers-components/start-game"
import { useHomeContext } from "../../context/home-context"

const DatesGamePage = () => {
  const { data, even } = useDatedContext()
  const { setCursor, cursor, startTime: starttime } = useHomeContext()
  console.log(even)

  const elementClick = (e: any) => {
    setCursor(e)
  }
  const handleBottom = () => {
    setCursor(cursor + 1)
    window.scrollTo(0, 30)
  }

  return (
    <>
      {starttime ? (
        <StartGameModal time={starttime} />
      ) : (
        <>
          <Link to="/dates/start">Start</Link>
          <div className="date-game container load-anim">
            <div className="dates">
              {data?.map((item, key) => (
                <div
                  id="card"
                  onClick={() => elementClick(key)}
                  className={classNames("card", {
                    active: key === cursor,
                  })}
                  key={key}
                >
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="events">
              {even?.map((el: string, k: any) => (
                <div
                  id={"div"}
                  onClick={() => elementClick(k)}
                  className={classNames("card", {
                    active: k === cursor,
                  })}
                >
                  <span key={k}>{el}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="navigation">
            <button
              className="bottom"
              disabled={cursor === 0}
              onClick={() => setCursor(cursor - 1)}
            >
              <img src={NavigationBtnImg} alt="" />
            </button>
            <button
              className="bottom"
              disabled={cursor > data?.length - 2}
              onClick={handleBottom}
            >
              <img className="bottom-img" src={NavigationBtnImg} alt="" />
            </button>
          </div>
        </>
      )}
    </>
  )
}
export default DatesGamePage