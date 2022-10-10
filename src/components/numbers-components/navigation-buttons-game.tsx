import { useEffect } from "react"
import { useHomeContext } from "../../context/home-context"
import Next from "../../assets/images/next.png"
import ResultNumbers from "./result-numbers"

const NavigationBtn = () => {
  const {
    cursorW,
    numbers,
    cursor,
    tab,
    dynum,
    setTab,
    setCursor,
    navigation,
    autosec,
  } = useHomeContext()

  const parsedCursorW = parseInt(cursorW!)

  const handleNext = () => {
    setCursor(cursor - parsedCursorW)
  }

  const handlePrev = () => {
    setCursor(cursor + parsedCursorW)
  }

  useEffect(() => {
    if (cursor > Number(dynum) - Number(parsedCursorW)) {
      setTab(Number(tab) + 1)
      setCursor(0)
    }

    if (cursor < 0) {
      setTab(tab - 1)
      setCursor(dynum - parsedCursorW)
    }

    if (tab === 3 && cursor > dynum - Number(parsedCursorW)) {
      setTab(0)
    }
  }, [navigation, tab, setTab, setCursor, dynum, cursor, parsedCursorW])

  useEffect(() => {
    if (navigation === "auto") {
      const timer = setTimeout(() => {
        setCursor(cursor + parsedCursorW)
      }, Number(autosec) * 1000)

      return () => clearTimeout(timer)
    }
  }, [navigation, cursor, cursorW, autosec, setCursor])

  const disablePrevButton = tab === 0 && cursor < parsedCursorW

  const disableNextButton = cursor > numbers.length - parsedCursorW - 1

  return (
    <>
      <div className="navigation">
        <button disabled={disablePrevButton} onClick={handleNext}>
          <img className="next" src={Next} alt="" />
        </button>

        <div className="numbers">
          <ResultNumbers />
        </div>

        <button disabled={disableNextButton} onClick={handlePrev}>
          <img className="prev" src={Next} alt="" />
        </button>
      </div>
    </>
  )
}

export default NavigationBtn
