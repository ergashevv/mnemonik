import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './main.scss'
import Next from './next.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import classNames from "classnames"



function App() {
  const [cursor, setCursor] = useState(0)
  const [cursorW, setCursorW] = useState(3)


  const numbers = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,



  ]

  console.log(cursor, "cursor");

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
            <Tab eventKey="home" title="First">
              {
                numbers.map((item, key) => (
                  <div className='card-number'>
                    <p>{item}</p>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="profile" title="Second">
              {
                numbers.map((item, key) => (
                  <div className={classNames("card-number", {
                    active: (key >= cursor && key < cursor + cursorW)
                  })}>
                    <p>{item}</p>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="longer-tab" title="Thirt">
              {
                numbers.map((item, key) => (
                  <div className='card-number'>
                    <p>{item}</p>
                  </div>
                ))
              }
            </Tab>
            <Tab eventKey="longer-tab1" title="Thirt">
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
        <img onClick={() => setCursor(cursor - cursorW)} className='next' src={Next} alt="" />
        <div className="numbers">
          <h1 className='m-0'>140</h1>
        </div>
        <img onClick={() => setCursor(cursor + cursorW)} className='prev' src={Next} alt="" />
      </div>
    </div>
  );
}

export default App;



