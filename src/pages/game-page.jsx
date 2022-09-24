import { Link } from 'react-router-dom'
import NavigationBtn from '../components/navigation-buttons-game';
import { useHomeContext } from '../context/home-context';
import classNames from "classnames"
import './main.scss'
import { useEffect } from 'react';
const NumbersGame = () => {
    const { cursorW, cursor, randomnumbers, tab, setCursor, dynum, seTdynum, setTab } = useHomeContext();
    const resetCursor = (index) => {
        setCursor(0)
        setTab(index)
    }
    useEffect(() => {
        if (parseInt(cursorW) === 4) {
            seTdynum(188)
            console.log('188');
        }
        if (parseInt(cursorW) === 3) {
            seTdynum(189)
            console.log('189');
        }
        if (parseInt(cursorW) === 2) {
            seTdynum(190)
            console.log('190');
        }

    }, [seTdynum, dynum, cursorW])
    return (
        <div className="game container">
            <div className="header">
                <div
                    className="num">
                    <div className="sort-num">
                        {
                            Array(Math.floor(40)).fill(null).map((_, index) => (
                                <>
                                    {
                                        tab === 0 && index < 10 ?
                                            <h2>{index + 1}</h2> : null
                                    }
                                    {
                                        tab === 1 && index > 9 && index < 20 ?
                                            <h2>{index + 1}</h2> : null
                                    }
                                    {
                                        tab === 2 && index > 19 && index < 30 ?
                                            <h2>{index + 1}</h2> : null
                                    }
                                    {
                                        tab === 3 && index > 29 && index <= 40 ?
                                            <h2>{index + 1}</h2> : null
                                    }
                                </>
                            ))
                        }
                    </div>
                    {Array(4).fill(null).map((_, index) => (
                        <>
                            {tab === index &&
                                <div className={`cards abs${index}`}>
                                    {
                                        randomnumbers.slice(dynum * tab, dynum * (tab + 1)).map((i, k) => (
                                            <>

                                                <div
                                                    className={classNames("card-number", {
                                                        active: (k >= cursor && k < cursor + parseInt(cursorW))
                                                    })}>
                                                    <p>
                                                        {i}
                                                    </p>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            }
                        </>
                    ))}
                </div>
            </div>
            <div className="tabs">
                {Array(4).fill(null).map((_, index) => (
                    <button className={tab === index && 'active'} onClick={() => resetCursor(index)} key={index}>{index + 1}</button>
                ))}
            </div>
            <NavigationBtn />
            <Link to="/start">Start</Link>
        </div >
    );
}

export default NumbersGame