import { useEffect } from "react"
import { useHomeContext } from "../../../context/home-context"
import "./main.scss"
export interface TimeProps {
  time: number
}
const StartGameModal = ({ time }: TimeProps) => {
  const { startTime, setStartTime } = useHomeContext()
  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      const newTime = startTime > 0 ? startTime - 1 : startTime
      setStartTime(newTime)
      if (newTime === 0) clearTimeout(timeout)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [setStartTime, startTime])
  return (
    <>
      <div className="start-game">
        {Array(time)
          .fill(null)
          .map((_, k: number) => (
            <h1 key={k} className={`time ${k + 1 === time ? "active" : ""}`}>
              {time === k + 1 && time}
            </h1>
          ))}
      </div>
    </>
  )
}
export default StartGameModal
