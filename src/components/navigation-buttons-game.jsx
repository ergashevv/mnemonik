import { useEffect } from 'react';
import Next from '../assets/images/next.png'
import { useHomeContext } from '../context/home-context';
import ResultNumbers from './result-numbers';
const NavigationBtn = () => {
    const { cursorW, numbers, cursor, tab, dynum, setTab, setCursor, navigation, autosec, setAutosec } = useHomeContext();
    const handleNext = () => {
        setCursor(parseInt(cursor) - parseInt(cursorW))
    }
    const handlePrev = () => {
        setCursor(parseInt(cursor) + parseInt(cursorW))
    }
    useEffect(() => {
        if (cursor > (dynum - parseInt(cursorW))) {
            setTab(tab + 1)
            setCursor(0)
        }
        if (cursor < 0) {
            setTab(tab - 1)
            setCursor(dynum - parseInt(cursorW))
        }
        if (tab == 3 && cursor > (dynum - parseInt(cursorW))) {
            setTab(0)
        }
    }, [navigation, tab, setTab, setCursor, dynum, cursor, cursorW])

    useEffect(() => {
        if (navigation === "auto") {
            const timer = setTimeout(() => {
                setCursor(parseInt(cursor) + parseInt(cursorW))
            }, autosec * 1000);
            return () => clearTimeout(timer);
        }
    }, [cursor]);
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