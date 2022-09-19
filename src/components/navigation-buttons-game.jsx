import Next from '../assets/images/next.png'
import { useHomeContext } from '../context/home-context';
import ResultNumbers from './result-numbers';
const NavigationBtn = () => {
    const { cursorW, numbers, cursor, setCursor } = useHomeContext();
    return (
        <>
            <div className="navigation">
                <button disabled={cursor < cursorW} onClick={() => setCursor(parseInt(cursor) - parseInt(cursorW))}>
                    <img className='next' src={Next} alt="" />
                </button>
                <div className="numbers d-flex">
                    <ResultNumbers />
                </div>
                <button disabled={cursor > numbers.length - cursorW - 1} onClick={() => setCursor(parseInt(cursor) + parseInt(cursorW))}>
                    <img className='prev' src={Next} alt="" />
                </button>
            </div>
        </>
    )
}
export default NavigationBtn