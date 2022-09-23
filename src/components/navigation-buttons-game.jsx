import Next from '../assets/images/next.png'
import { useHomeContext } from '../context/home-context';
import ResultNumbers from './result-numbers';
const NavigationBtn = () => {
    const { cursorW, numbers, cursor, tab, setCursor } = useHomeContext();
    const handleNext = () => {
        setCursor(parseInt(cursor) - parseInt(cursorW))
    }
    const handlePrev = () => {
        setCursor(parseInt(cursor) + parseInt(cursorW))
    }
    return (
        <>
            <div className="navigation">
                <button disabled={tab === 0 && cursor < cursorW} onClick={handleNext}>
                    <img className='next' src={Next} alt="" />
                </button>
                <div className="numbers">
                    <ResultNumbers />
                </div>

                <button disabled={parseInt(cursor) > numbers.length - parseInt(cursorW) - 1} onClick={handlePrev}>
                    <img disabled={tab === 3 && cursor >= 189} className='prev' src={Next} alt="" />
                </button>
            </div>
        </>
    )
}
export default NavigationBtn