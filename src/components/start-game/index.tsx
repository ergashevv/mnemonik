import './main.scss'
interface TimeProps {
    time: number
}
const StartGameModal = ({ time }: TimeProps) => {
    return (
        <>
            <div className="start-game">
                {
                    Array(time).fill(null).map((_, k: number) => (
                        <h1 key={k} className={`time ${k + 1 === time ? 'active' : ''}`}>
                            {time === k + 1 && time}
                        </h1>
                    ))
                }
            </div>
        </>
    )
}
export default StartGameModal