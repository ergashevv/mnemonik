import { useEffect } from "react";
import { useHomeContext } from "../context/home-context";
import Form from 'react-bootstrap/Form'

const Result = () => {
    const { result, randomnumbers } = useHomeContext();
    useEffect(() => {
        function beforeUnload(e) {
            e.preventDefault()
            e.returnValue = "Are you sure?"
        }

        document.addEventListener("beforeunload", beforeUnload, { capture: true })

        return () => document.removeEventListener("beforeunload", beforeUnload, { capture: true })
    }, [])
    return (
        <>
            <div className="start-game">
                {result?.map((value, index) => (
                    <Form.Control
                        style={{
                            color: value !== randomnumbers[index] && "red",
                        }}
                        readOnly placeholder={value} value={value} type="text" />
                ))}
            </div>
        </>
    )
}
export default Result