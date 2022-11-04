import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LeftNumber from '../../components/left-numbers'
import Tabs from '../../components/tabs'
import TimerComponent from '../../components/timer'
import { useHomeContext } from '../../context/home-context'
import InputCell from './input-cell'
import './numbers-page.scss'
const StartNumberGame = () => {
  const {
    numbers,
    randomNumbers,
    setResult,
    tab,
    setTab,
    dynamic,
    timerForAnswer
  } = useHomeContext()

  const [inputs, setInputs] = useState(Array(numbers.length).fill(''))
  const handleValue = useCallback((val: any, index: number | undefined) => {
    return setInputs((inputs) =>
      inputs.map((input, i) => (i === index ? val : input))
    )
  }, [])
  const handleShiftAdd = useCallback((e: any, index: number | undefined) => {
    setInputs((inputs) => {
      const start = inputs.slice(0, index)
      const end = inputs.slice(index)
      return start.concat([''], end)
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
      randomNumbers.map((_, index) => (
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
      randomNumbers
    ]
  )
  const finishGame = () => {
    setResult(inputs)
    setTab(0)
  }

  return (
    <div className="start-game-page container">
      <div className="navbar-header">
        <TimerComponent
          time={timerForAnswer}
          navigateTo={'/numbers/result'}
          finishTimeFunc={finishGame}
        />
        <button onClick={finishGame}>
          <Link className="finish-now-btn" to="/numbers/result">
            Hoziroq tugatish
          </Link>
        </button>
      </div>
      <div className="start-game-group">
        <LeftNumber />
        {Array(4)
          .fill(null)
          .map((_, index) => {
            const slicedInputs = inputsCells.slice(
              dynamic * tab,
              dynamic * (tab + 1)
            )
            return (
              <>
                {tab === index && (
                  <div className="inputs-groups">{slicedInputs}</div>
                )}
              </>
            )
          })}
      </div>
      <div className="tabs">
        <Tabs tabNumber={4} />
      </div>
    </div>
  )
}
export default StartNumberGame
