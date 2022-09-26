import { Link } from 'react-router-dom'
import NavigationBtn from '../components/navigation-buttons-game';
import { useHomeContext } from '../context/home-context';
import classNames from "classnames"
import { useNavigate } from 'react-router'
import './main.scss'
import { useEffect, useState } from 'react';
const NumbersGame = () => {
    const { cursorW, cursor, randomnumbers, tab, setCursor, dynum, seTdynum, setTab } = useHomeContext();
    const resetCursor = (index) => {
        setCursor(0)
        setTab(index)
    }

    const [seconds, setSeconds] = useState(60)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => setSeconds(seconds - 1), 1000)
    }, [seconds])

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000)
        } if (seconds < 0) {
            navigate('/start')
        }
    })
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
            <div className='screen-countdown' style={{ display: seconds >= 0 ? 'block' : 'none' }}>
                <h3>Memorization starts in: </h3>
                <span>{seconds} s</span>
            </div>
            <div className="header">
                <div
                    className="num">
                    <div className="sort-num">
                        {
                            Array(Math.floor(40)).fill(null).map((_, index) => (
                                <>
                                    {
                                        tab === 0 && index < 10 ?
                                            <span>{index + 1}</span> : null
                                    }
                                    {
                                        tab === 1 && index > 9 && index < 20 ?
                                            <span>{index + 1}</span> : null
                                    }
                                    {
                                        tab === 2 && index > 19 && index < 30 ?
                                            <span>{index + 1}</span> : null
                                    }
                                    {
                                        tab === 3 && index > 29 && index <= 40 ?
                                            <span>{index + 1}</span> : null
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