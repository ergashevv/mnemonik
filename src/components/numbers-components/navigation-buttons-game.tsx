import { useEffect } from 'react'
import Next from '../../assets/images/arrow.svg'
import { useHomeContext } from '../../context/home-context'
import ResultNumbers from './result-numbers'
import './main.scss'
const NavigationBtn = () => {
  const {
    cursorW,
    numbers,
    cursor,
    tab,
    dynamic,
    setTab,
    setCursor,
    navigation,
    autoSecond
  } = useHomeContext()

  const parsedCursorW = parseInt(cursorW!)

  const handleNext = () => {
    setCursor(cursor - parsedCursorW)
  }

  const handlePrev = () => {
    setCursor(cursor + parsedCursorW)
  }

  useEffect(() => {
    if (cursor > Number(dynamic) - Number(parsedCursorW)) {
      setTab(Number(tab) + 1)
      setCursor(0)
    }

    if (cursor < 0) {
      setTab(tab - 1)
      setCursor(dynamic - parsedCursorW)
    }
  }, [navigation, tab, setTab, setCursor, dynamic, cursor, parsedCursorW])

  useEffect(() => {
    if (navigation === 'auto') {
      const timer = setInterval(() => {
        setCursor(cursor + parsedCursorW)
      }, (Number(autoSecond) / 10) * 1000)
      return () => clearInterval(timer)
    }
    if (
      tab === 3 &&
      cursor >
        Number(numbers.slice(dynamic * tab, dynamic * (tab + 1)).length) -
          Number(cursorW) +
          1
    ) {
      setTab(0)
      setCursor(0)
    }
  }, [
    navigation,
    cursor,
    cursorW,
    autoSecond,
    setCursor,
    parsedCursorW,
    tab,
    numbers,
    dynamic,
    setTab
  ])

  const disablePrevButton = tab === 0 && cursor < parsedCursorW

  const disableNextButton = cursor > numbers.length - parsedCursorW - 1
  return (
    <div className="navigation-buttons">
      <div className="navigation">
        <button disabled={disablePrevButton} onClick={handleNext}>
          <img className="next" src={Next} alt="next" />
        </button>
        <div className="numbers">
          <ResultNumbers />
        </div>
        <button disabled={disableNextButton} onClick={handlePrev}>
          <img className="prev" src={Next} alt="prev" />
        </button>
      </div>
    </div>
  )
}

export default NavigationBtn
