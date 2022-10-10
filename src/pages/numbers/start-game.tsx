import { useHomeContext } from "../../context/home-context"
import "./main.scss"
import { useCallback, useEffect, useMemo, useState } from "react"
import InputCell from "./input-cell"
import { Link, useNavigate } from "react-router-dom"
const StartNumberGame = () => {
  const {
    numbers,
    randomNumbers: randomnumbers,
    setResult,
    tab,
    setCursor,
    setTab,
  } = useHomeContext()
  const resetCursor = (index: number) => {
    setCursor(0)
    setTab(index)
  }
  const [inputs, setInputs] = useState(Array(numbers.length).fill(""))
  const handleValue = useCallback((val: any, index: number | undefined) => {
    return setInputs((inputs) =>
      inputs.map((input, i) => (i === index ? val : input))
    )
  }, [])

  const [seconds, setSeconds] = useState(60)
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setSeconds(seconds - 1), 1000)
  }, [seconds])

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    }
    if (seconds < 0) {
      navigate("/result")
      setResult(inputs)
    }
  })

  const handleShiftAdd = useCallback((e: any, index: number | undefined) => {
    setInputs((inputs) => {
      const start = inputs.slice(0, index)
      const end = inputs.slice(index)
      return start.concat([""], end)
    })
  }, [])

  const handleShiftRemove = useCallback((e: any, index: number | undefined) => {
    if (index) {
      setInputs((inputs) => {
        const start = inputs.slice(0, index)
        const end = inputs.slice(index + 1)
        return start.concat(end)
      })
    }
  }, [])

  const handleFocusOnNext = useCallback((e: any) => {
    const nextInput = e.currentTarget?.nextSibling
    nextInput?.focus()
  }, [])

  const handleFocusOnPrev = useCallback((e: any) => {
    const prevInput = e.currentTarget?.previousSibling
    prevInput?.focus()
  }, [])

  const inputsCells = useMemo(
    () =>
      randomnumbers.map((_, index) => (
        <InputCell
          key={index}
          index={index}
          value={inputs[index]}
          onValue={handleValue}
          focusOnNext={handleFocusOnNext}
          focusOnPrev={handleFocusOnPrev}
          onShiftAdd={handleShiftAdd}
          onShiftRemove={handleShiftRemove}
        />
      )),
    [
      handleFocusOnNext,
      handleFocusOnPrev,
      handleShiftAdd,
      handleShiftRemove,
      handleValue,
      inputs,
      randomnumbers,
    ]
  )
  return (
    <div className="game">
      <div
        style={{
          justifyContent: "space-between",
        }}
        className="d-flex"
      >
        <span>{seconds} s</span>
        <button onClick={() => setResult(inputs)}>
          <Link to="/numbers/result">Finish</Link>
        </button>
      </div>
      <div className="d-flex">
        <div
          style={{
            marginRight: "4px",
          }}
        >
          {Array(Math.floor(40))
            .fill(null)
            .map((_, index) => (
              <>
                {tab === 0 && index < 10 ? (
                  <span className="num-or">{index + 1})</span>
                ) : null}
                {tab === 1 && index > 9 && index < 20 ? (
                  <span className="num-or">{index + 1})</span>
                ) : null}
                {tab === 2 && index > 19 && index < 30 ? (
                  <span className="num-or">{index + 1})</span>
                ) : null}
                {tab === 3 && index > 29 && index <= 40 ? (
                  <span className="num-or">{index + 1})</span>
                ) : null}
              </>
            ))}
        </div>

        {Array(4)
          .fill(null)
          .map((_, index) => {
            const slicedInputs = inputsCells.slice(
              190 * index,
              190 * (index + 1)
            )

            return (
              <>
                {tab === index && (
                  <div className="start-game">{slicedInputs}</div>
                )}
              </>
            )
          })}
      </div>
      <div className="tabs">
        {Array(4)
          .fill(null)
          .map((_, index) => {
            const className = tab === index ? "active" : undefined
            const handleClick = () => resetCursor(index)

            return (
              <button className={className} onClick={handleClick} key={index}>
                {index + 1}
              </button>
            )
          })}
      </div>
    </div>
  )
}
export default StartNumberGame
