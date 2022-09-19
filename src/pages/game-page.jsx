import classNames from "classnames"
import Next from '../next.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useHomeContext } from "../context/home-context";
import { useState } from "react";
import { Link } from 'react-router-dom'
const NumbersGame = () => {
    const { cursorW, numbers } = useHomeContext();  
    const [cursor, setCursor] = useState(0)
    console.log(cursor, 'cursor');
    const newnumbers = numbers.slice(parseInt(cursor), parseInt(cursor) + parseInt(cursorW))

    return (
        <div className="game container">
            <div className="header">
                <div className="num">
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title="1">
                            {
                                numbers.map((item, key) => (
                                    <div className='card-number'>
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </Tab>
                        <Tab eventKey="profile" title="2">
                            {
                                numbers.map((item, key) => (
                                    <div className={classNames("card-number", {
                                        active: (key >= cursor && key < cursor + parseInt(cursorW))
                                    })}>
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </Tab>
                        <Tab eventKey="longer-tab" title="3">
                            {
                                numbers.map((item, key) => (
                                    <div className='card-number'>
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </Tab>
                        <Tab eventKey="longer-tab1" title="4">
                            {
                                numbers.map((item, key) => (
                                    <div className='card-number'>
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <div className="navigation">
                <button disabled={cursor < cursorW} onClick={() => setCursor(parseInt(cursor) - parseInt(cursorW))}>
                    <img className='next' src={Next} alt="" />
                </button>
                <div className="numbers d-flex">
                    {
                        newnumbers?.map((item, key) => (
                            <h1 className='m-0'>
                                {item}
                            </h1>
                        ))
                    }
                </div>
                <button disabled={cursor > numbers.length - cursorW - 1} onClick={() => setCursor(parseInt(cursor) + parseInt(cursorW))}>
                    <img className='prev' src={Next} alt="" />
                </button>
            </div>
            <Link to="/start">Start</Link>
        </div>
    );
}

export default NumbersGame