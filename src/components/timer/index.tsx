import { useState, memo, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router'

interface ITimerProps {
  time: number
  navigateTo: string
  finishTimeFunc?: any
}

function TimerComponent({ time, navigateTo, finishTimeFunc }: ITimerProps) {
  const [seconds, setSeconds] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(time)
  console.log(seconds)

  const navigate = useNavigate()

  useLayoutEffect(() => {
    const timeInterval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          navigate(navigateTo)
          if (finishTimeFunc) {
            finishTimeFunc()
          }
          // clearInterval(timeInterval)
        } else {
          setMinutes((minutes) => minutes - 1)
          setSeconds(59)
        }
      }
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      }
    }, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [finishTimeFunc, minutes, setSeconds, navigate, navigateTo, seconds])

  return (
    <>
      <div>
        <span className='timer'>
          {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
    </>
  )
}

export default memo(TimerComponent)
