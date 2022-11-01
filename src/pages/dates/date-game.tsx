import classNames from 'classnames'
import { Link } from 'react-router-dom'
import NavigationBtnImg from '../../assets/images/next.png'
import StartGameModal from '../../components/start-game'
import TimerComponent from '../../components/timer'
import { useDatedContext } from '../../context/date-context'
import { useHomeContext } from '../../context/home-context'
import './dates-page.scss'

const DatesGamePage = () => {
  const { data, even } = useDatedContext()
  const { setCursor, cursor, startTime, timerForRecall } = useHomeContext()

  const elementClick = (e: any) => {
    setCursor(e)
  }

  const handleBottom = () => {
    setCursor(cursor + 1)
  }

  const stringStartTime = String(startTime)
  const numberStartTime = Number(startTime)
  return (
    <div className='container'>
      {numberStartTime > 0
        ? (
          <StartGameModal time={stringStartTime} />
        )
        : (
          <>
            <div
              style={{
                justifyContent: 'space-between',
                marginBottom: "20px"
              }}
              className="d-flex">
              <TimerComponent time={timerForRecall} navigateTo={'/dates/start'} />
              <Link className="finish-now-btn" to="/dates/start">Hoziroq tugatish</Link>
            </div>
            <div className="date-game  load-anim">
              <div className="dates">
                {data?.map((item, key) => (
                  <div
                    id="scroll-to-bottom"
                    onClick={() => elementClick(key)}
                    className={classNames('dates-card', {
                      active: key === cursor
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
                    onClick={() => elementClick(k)}
                    className={classNames('dates-card', {
                      active: k === cursor
                    })}
                    key={k}
                  >
                    <span>{el}</span>
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
    </div>
  )
}
export default DatesGamePage
