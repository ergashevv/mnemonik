import classNames from 'classnames'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Next from '../../assets/images/icons/arrow-right.svg'
import Prev from '../../assets/images/icons/arrow-left.svg'
import StartGameModal from '../../components/start-game'
import TimerComponent from '../../components/timer'
import { useCardsContext } from '../../context/cards-context'
import { useHomeContext } from '../../context/home-context'
import './cards-page.scss'
const CardGame = () => {
  const { startTime: starttime, cursor, setCursor, cursorW, timerForRecall } = useHomeContext()
  const { data, randomCard, navigation, show } = useCardsContext()

  const parsedCursorW = parseInt(cursorW!)
  // if(cursor)
  const showCards = randomCard!.slice(cursor, cursor + parsedCursorW)

  useEffect(() => {
    if (navigation === 'right') {
      setCursor(data.length - parsedCursorW)
    } else {
      setCursor(0)
    }
  }, [setCursor, navigation, data.length, parsedCursorW])
  const nextNavigate = () => {
    if (navigation === 'right') {
      setCursor(cursor - parsedCursorW)
    } else {
      setCursor(cursor + parsedCursorW)
    }
  }
  const prevNavigate = () => {
    if (navigation === 'right') {
      setCursor(cursor + parsedCursorW)
    } else {
      setCursor(cursor - parsedCursorW)
    }
  }
  return (
    <>
      {Number(starttime) >= 1 ? (
        <StartGameModal time={starttime!} />
      ) : (
        <>
          <div className='container playing-cards'>
            <div className='card-timer'>
              <TimerComponent time={timerForRecall} navigateTo={'/cards/start'} />
              <Link className='finish-now-btn' to='/cards/start'>
                Hoziroq tugatish
              </Link>
            </div>
            <div className='show-card'>
              {showCards.map((i, k) => (
                <img key={k} src={i.image} alt='' />
              ))}
            </div>
            <div className='numbers-of'>
              {navigation === 'right' ? (
                <>
                  <h2>{data.length - cursor}</h2>
                  <h1> /{data.length}</h1>
                </>
              ) : (
                <>
                  <h2>{cursor + parsedCursorW}</h2>
                  <h1>/ {data.length}</h1>
                </>
              )}
            </div>
            <div className='cards'>
              {randomCard!.map((item, key) => (
                <div
                  className={classNames('playing-card', {
                    active: key >= cursor && key < cursor + parsedCursorW,
                  })}
                  key={key}
                >
                  <img
                    style={{
                      marginRight: show === 'small' ? '-60px' : '-30px',
                      // display: 'none',
                    }}
                    src={item.image}
                    alt=''
                  />
                </div>
              ))}
            </div>
            <div className='d-flex btn-navigation'>
              <button
                disabled={
                  navigation === 'right' ? cursor >= data.length - parsedCursorW : cursor <= 0
                }
                onClick={prevNavigate}
              >
                <img width='100px' src={Prev} alt='' />
              </button>
              <button
                disabled={
                  navigation === 'right' ? cursor <= 0 : cursor >= data.length - parsedCursorW
                }
                onClick={nextNavigate}
              >
                <img className='right-navigation' width='100px' src={Next} alt='next' />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default CardGame
