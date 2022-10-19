import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

interface ITimerProps {
  time: number
  navigateTo: string
  finishTimeFunc?: any
}

const TimerComponent = ({ time, navigateTo, finishTimeFunc }: ITimerProps) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(time)

  const navigate = useNavigate()

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          navigate(navigateTo)
          if (finishTimeFunc) {
            finishTimeFunc()
          }
          clearInterval(timeInterval)
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }

      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
    }, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [finishTimeFunc, minutes, navigate, navigateTo, seconds])

  return (
    <>
      <div>
        <span>
          {minutes}m : {seconds < 10 ? `${seconds}` : seconds}s{" "}
        </span>
      </div>
    </>
  )
}
export default TimerComponent
