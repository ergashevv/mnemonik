import { useEffect, useState } from "react";
import { useHomeContext } from "../context/home-context";
import classNames from "classnames"

const Result = () => {
    const { result, randomnumbers, cursorW, cursor, } = useHomeContext();
    const [show, setShow] = useState(false)


    return (
        <>
            <button onClick={() => setShow(!show)}>
                {
                    show ? 'user result' : "show result"
                }
            </button>
            <div className="start-game">
                {result?.map((value, index) => (
                    <p
                        className={show && 'show'}
                        style={{
                            color: value !== randomnumbers[index] && "red",
                        }}
                    >
                        {show ? (randomnumbers[index]) : value}
                    </p>
                ))}
            </div>
        </>
    )
}
export default Result