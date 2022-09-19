import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom'
import NavigationBtn from '../components/navigation-buttons-game';
import NumbersTab from "../components/numbers-tab";
const NumbersGame = () => {
    return (
        <div className="game container">
            <div className="header">
                <div className="num">
                    <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3" fill>
                        <Tab eventKey="home" title="1">
                            <NumbersTab />
                        </Tab>
                        <Tab eventKey="profile" title="2">
                            <NumbersTab />
                        </Tab>
                        <Tab eventKey="longer-tab" title="3">
                            <NumbersTab />
                        </Tab>
                        <Tab eventKey="longer-tab1" title="4">
                            <NumbersTab />
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <NavigationBtn />
            <Link to="/start">Start</Link>
        </div>
    );
}

export default NumbersGame