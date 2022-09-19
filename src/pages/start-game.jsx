import { useHomeContext } from "../context/home-context";
import Form from 'react-bootstrap/Form';
import './main.scss'
import { useState } from "react";
const StartNumberGame = () => {
    const { numbers } = useHomeContext();
    const [value, setValue] = useState([]);
    const codeChangeHandler = (event) => {
        const element = event.target;
        const nextSibling = element.nextElementSibling;
        nextSibling ? nextSibling.focus() : console.log('fak');
        if (event.key === "Backspace") {
            const prevInput = element?.previousSibling
            prevInput ? prevInput?.focus() : console.log('wtf');;
        }
    };
    function onChange(e) {
        if (!e.target.validity.patternMismatch) {
           value? setValue.push(e.target.value): console.log('abs');
            console.log(value)
        }
    }

    return (
        <>
            <div className="start-game">
                {
                    numbers.map((item, key) => (
                        <Form.Control className="card-inputs" pattern="^[0-9]*$" onChange={onChange} onKeyUp={(e) => codeChangeHandler(e)} id={key + 1} min={1} max={1} key={key} maxLength={1} />
                    ))
                }
            </div>
        </>
    )
}
export default StartNumberGame