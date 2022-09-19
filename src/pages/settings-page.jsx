
import Form from 'react-bootstrap/Form';
import { useHomeContext } from '../context/home-context';
import { Link } from 'react-router-dom'
import './main.scss'
const SettingsPage = () => {
    const { setCursorW, cursorW } = useHomeContext();
    return (
        <>
            <div className="setting-page container">
                <h1>Change cursor numbers</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={cursorW} onChange={(e) => setCursorW(e.target.value)} type="number" placeholder="Enter number" />
                </Form.Group>
                <button disabled={cursorW < 1} className='d-flex m-0 m-auto'>
                    <Link to="/game">
                        start
                    </Link>
                </button>
            </div>
        </>
    )
}

export default SettingsPage     