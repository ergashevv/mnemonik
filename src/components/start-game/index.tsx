import { useEffect } from "react"
import { useHomeContext } from "../../context/home-context"
import "./main.scss"

export interface TimeProps {
  time: string
}

const StartGameModal = ({ time }: TimeProps) => {
  const { setStartTime } = useHomeContext()
  const numberStartTime = Number(time)

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      const newTime =
        numberStartTime > 0 ? numberStartTime - 1 : numberStartTime
      setStartTime(String(newTime))
      if (newTime === 0) {
        clearTimeout(timeout)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [numberStartTime, setStartTime, time])

  return (
    <div
      style={{
        display: numberStartTime < 1 ? "none" : "block",
      }}
      className={"start-timer"}
    >
      {Array(numberStartTime)
        .fill(null!)
        .map((_, index: number) => (
          <h1
            key={index}
            className={`time ${index + 1 === numberStartTime ? "active" : ""}`}
          >
            {numberStartTime === index + 1 && numberStartTime}
          </h1>
        ))}
    </div>
  )
}
export default StartGameModal
