import { useMemo } from "react";
import { useState } from "react";
import { useHomeContext } from "../context/home-context";

const Result = () => {
    const [show, setShow] = useState(false)

    const { result, tab, randomnumbers, setCursor, setTab, dynum } = useHomeContext();
    const resetCursor = (index) => {
        setCursor(0)
        setTab(index)
    }

    const count = useMemo(() => {
        let count = 0

        result?.forEach((item, k) => {
            if (item !== randomnumbers[k]) count++
        });

        return count
    }, [randomnumbers, result])

    console.log(count)

    return (
        <>

            <span style={{
                display: "block",
                marginBottom: "6px"
            }} >  Umumiy  {randomnumbers.length}</span>
            <span style={{
                display: "block",
                marginBottom: "6px"

            }} > To'g'ri javoblar {randomnumbers.length - count}</span>
            <span> Xato  javoblar {count}</span>



            <div className="d-flex result-card">
                <div style={{
                    marginRight: "4px"
                }}>
                    {
                        Array(Math.floor(40)).fill(null).map((_, index) => (
                            <>
                                {
                                    tab === 0 && index < 10 ?
                                        <span className={show ? 'num-or active' : "num-or"}>{index + 1})</span> : null
                                }
                                {
                                    tab === 1 && index > 9 && index < 20 ?
                                        <span className={show ? 'num-or active' : "num-or"}>{index + 1})</span> : null
                                }
                                {
                                    tab === 2 && index > 19 && index < 30 ?
                                        <span className={show ? 'num-or active' : "num-or"}>{index + 1})</span> : null
                                }
                                {
                                    tab === 3 && index > 29 && index <= 40 ?
                                        <span className={show ? 'num-or active' : "num-or"}>{index + 1})</span> : null
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
                                    result?.slice(dynum * tab, dynum * (tab + 1)).map((value, index) => (
                                        <>
                                            <div style={{
                                                margin: "4px 0"
                                            }}>
                                                <input
                                                    readOnly
                                                    style={{
                                                        color: value === randomnumbers[index] ? "green" : "red",
                                                        fontWeight: "bold"
                                                    }}
                                                    value={value} type="text" />
                                                {
                                                    show &&
                                                    <input readOnly value={randomnumbers[index]} type="text" />
                                                }
                                            </div>
                                        </>
                                    ))
                                }

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