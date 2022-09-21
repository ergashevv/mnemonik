import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom'
import NavigationBtn from '../components/navigation-buttons-game';
import NumbersTab from "../components/numbers-tab";
import { useHomeContext } from '../context/home-context';
const NumbersGame = () => {
    const { cursorW, cursor, randomnumbers } = useHomeContext();
    return (
        <div className="game container">
            <div className="header">
                <div className="num">
                    <Tabs defaultActiveKey="tab-0" id="fill-tab-example" className="mb-3" fill>
                        {Array(4).fill(null).map((_, index) => (
                            <Tab eventKey={`tab-${index}`} title={index + 1} key={index}>
                                <NumbersTab tab={index} />
                            </Tab>
                        ))}
                    </Tabs>
                </div>
            </div>
            <NavigationBtn />
            <Link to="/start">Start</Link>
        </div>
    );
}

export default NumbersGame