import { useState } from "react";
import { useHomeContext } from "../context/home-context";

const Result = () => {
    const [show, setShow] = useState(false)

    const { result, tab, randomnumbers, setCursor, setTab, dynum } = useHomeContext();
    const resetCursor = (index) => {
        setCursor(0)
        setTab(index)
    }

    return (
        <>
            <div className="d-flex">
                <div style={{
                    marginRight: "4px"
                }}>
                    {
                        Array(Math.floor(40)).fill(null).map((_, index) => (
                            <>
                                {
                                    tab === 0 && index < 10 ?
                                        <span className="num-or">{index + 1}</span> : null
                                }
                                {
                                    tab === 1 && index > 9 && index < 20 ?
                                        <span className="num-or">{index + 1}</span> : null
                                }
                                {
                                    tab === 2 && index > 19 && index < 30 ?
                                        <span className="num-or">{index + 1}</span> : null
                                }
                                {
                                    tab === 3 && index > 29 && index <= 40 ?
                                        <span className="num-or">{index + 1}</span> : null
                                }
                            </>
                        ))
                    }
                </div>
                {Array(4).fill(null).map((_, index) => (
                    <>
                        {tab === index &&
                            <div className="start-game">
                                {
                                    show ?
                                        <>
                                            {
                                                randomnumbers?.slice(dynum * tab, dynum * (tab + 1)).map((value, index) => (
                                                    <input
                                                        readOnly
                                                        value={value} type="text" />
                                                ))}
                                        </> :
                                        result?.slice(dynum * tab, dynum * (tab + 1)).map((value, index) => (
                                            <input
                                                readOnly
                                                style={{
                                                    color: value !== randomnumbers[index] && "red",
                                                }}
                                                value={value} type="text" />
                                        ))}
                            </div>
                        }
                    </>
                ))}
            </div>
            <div className="tabs">
                {Array(4).fill(null).map((_, index) => (
                    <button className={tab === index && 'active'} onClick={() => resetCursor(index)} key={index}>{index + 1}</button>
                ))}
            </div>
            <button onClick={() => setShow(!show)}>
                {
                    show ? 'user result' : "show result"
                }
            </button>

        </>
    )
}
export default Result