import { useEffect } from "react"
import Next from "../../assets/images/next.png"
import { useHomeContext } from "../../context/home-context"
import ResultNumbers from "./result-numbers"

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
    autoSecond,
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

    if (tab === 3 && cursor > dynamic - Number(parsedCursorW)) {
      setTab(0)
    }
  }, [navigation, tab, setTab, setCursor, dynamic, cursor, parsedCursorW])

  useEffect(() => {
    if (navigation === "auto") {
      const timer = setTimeout(() => {
        setCursor(cursor + parsedCursorW)
      }, Number(autoSecond) * 1000)

      return () => clearTimeout(timer)
    }
  }, [navigation, cursor, cursorW, autoSecond, setCursor, parsedCursorW])

  const disablePrevButton = tab === 0 && cursor < parsedCursorW

  const disableNextButton = cursor > numbers.length - parsedCursorW - 1

  return (
    <>
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
    </>
  )
}

export default NavigationBtn
