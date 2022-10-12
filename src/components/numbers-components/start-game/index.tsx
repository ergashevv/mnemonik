import "./main.scss"

export interface TimeProps {
  time: number
}

const StartGameModal = ({ time }: TimeProps) => {
  return (
      <div className="start-game">
        {Array(time)
          .fill(null)
          .map((_, index: number) => (
            <h1
              key={index}
              className={`time ${index + 1 === time ? "active" : ""}`}
            >
              {time === index + 1 && time}
            </h1>
          ))}
      </div>
  )
}
export default StartGameModal
