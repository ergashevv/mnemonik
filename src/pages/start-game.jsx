import { useHomeContext } from "../context/home-context";
import './main.scss'
import { useCallback, useEffect, useMemo, useState } from "react";
import InputCell from "./input-cell";
const StartNumberGame = () => {
    const { numbers } = useHomeContext();
    const [inputs, setInputs] = useState(Array(numbers.length).fill(""));
    console.log(inputs);

    const handleValue = useCallback((val, index) => {
        return setInputs((inputs) =>
            inputs.map((input, i) => (i === index ? val : input))
        )
    }, [])


    const handleShiftAdd = useCallback((e, index) => {
        setInputs((inputs) => {
            const start = inputs.slice(0, index)
            const end = inputs.slice(index)
            return start.concat([""], end)
        })
    }, [])

    const handleShiftRemove = useCallback((e, index) => {
        if (index) {
            setInputs((inputs) => {
                const start = inputs.slice(0, index)
                const end = inputs.slice(index + 1)
                return start.concat(end)
            })
        }
    }, [])

    const handleFocusOnNext = useCallback((e) => {
        const nextInput = e.currentTarget?.nextSibling
        nextInput?.focus()
    }, [])

    const handleFocusOnPrev = useCallback((e) => {
        const prevInput = e.currentTarget?.previousSibling
        prevInput?.focus()
    }, [])
    useEffect(() => {
        console.log(inputs, 'inp');
    }, [inputs])

    const inputsCells = useMemo(
        () =>
            numbers.map((_, index) => (
                <InputCell
                    key={index}
                    index={index}
                    value={inputs[index]}
                    onValue={handleValue}
                    focusOnNext={handleFocusOnNext}
                    focusOnPrev={handleFocusOnPrev}
                    onShiftAdd={handleShiftAdd}
                    onShiftRemove={handleShiftRemove}
                />
            )),
        [
            handleFocusOnNext,
            handleFocusOnPrev,
            handleShiftAdd,
            handleShiftRemove,
            handleValue,
            inputs,
            numbers,
        ]
    )
    return (
        <div className="start-game">
            {inputsCells}
        </div>
    )
}
export default StartNumberGame