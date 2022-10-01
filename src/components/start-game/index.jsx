import './main.scss'
const StartGameModal = ({ time }) => {
    return (
        <>
            <div className="start-game">
                {
                    Array(time).fill(null).map((_, k) => (
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