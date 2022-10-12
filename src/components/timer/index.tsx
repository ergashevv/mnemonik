import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
interface ITimerProps {
  time: number
  navigateTo: string
}
const TimerComponent = ({ time, navigateTo }: ITimerProps) => {
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
    }
  })
  const screenCountdownStyle = {
    display: seconds >= 0 ? "flex" : "none",
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
