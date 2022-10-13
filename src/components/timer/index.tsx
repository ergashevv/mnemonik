import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useHomeContext } from "../../context/home-context"
interface ITimerProps {
  time: number
  navigateTo: string
  // result?: string[]
  finishTimeFunc?: any
}

const TimerComponent = ({ time, navigateTo, finishTimeFunc }: ITimerProps) => {
  const [seconds, setSeconds] = useState<number>(time)

  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => setSeconds(seconds - 1), 1000)
  }, [seconds])

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    }
    if (seconds < 1) {
      navigate(navigateTo)
      if (finishTimeFunc) {
        finishTimeFunc()
      }
    }
  })
  const screenCountdownStyle = {
    display: seconds >= 0 ? "block" : "none",
    justifyContent: "space-between",
  }
  return (
    <>
      <div style={screenCountdownStyle}>
        <span>{seconds} s</span>
      </div>
    </>
  )
}
export default TimerComponent
