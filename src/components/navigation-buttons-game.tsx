import { useEffect } from 'react';
import Next from '../assets/images/next.png'
import { useHomeContext } from '../context/home-context';
import ResultNumbers from './result-numbers';
const NavigationBtn = () => {
    const { cursorW, numbers, cursor, tab, dynum, setTab, setCursor, navigation, autosec } = useHomeContext();
    const handleNext = () => {
        setCursor(cursor - parseInt(cursorW!))
    }
    const handlePrev = () => {
        setCursor(cursor + parseInt(cursorW!))
    }
    useEffect(() => {
        if (cursor > ((Number(dynum)) - Number(parseInt(cursorW!)))) {
            setTab(Number(tab) + 1)
            setCursor(0)
        }
        if (cursor < 0) {
            setTab(tab - 1)
            setCursor(dynum - parseInt(cursorW!))
        }
        if (tab === 3 && cursor > (dynum - Number(parseInt(cursorW!)))) {
            setTab(0)
        }
    }, [navigation, tab, setTab, setCursor, dynum, cursor, parseInt(cursorW!)])

    useEffect(() => {
        if (navigation === "auto") {
            const timer = setTimeout(() => {
                setCursor(cursor + parseInt(cursorW!))
            }, (Number(autosec)) * 1000);
            return () => clearTimeout(timer);
        }
    }, [navigation, cursor, parseInt(cursorW!), autosec, setCursor]);
    return (
        <>
            <div className="navigation">
                <button disabled={tab === 0 && cursor < parseInt(cursorW!)} onClick={handleNext}>
                    <img className='next' src={Next} alt="" />
                </button>
                <div className="numbers">
                    <ResultNumbers />
                </div>

                <button disabled={cursor > numbers.length - parseInt(cursorW!) - 1} onClick={handlePrev}>
                    <img className='prev' src={Next} alt="" />
                </button>
            </div>
        </>
    )
}
export default NavigationBtn