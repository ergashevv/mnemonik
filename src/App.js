import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './main.scss'
import Next from './next.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function App() {
  const numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    41,
    54,
    61,
    12,
    23,
    32,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    611,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    611,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    122,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    122,
    231,
    321,
    412,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    543,
    411,
    411,
    411,
    411,
    411,
    411,
    411,
    411,
    411,
    411,
    411,
    411,
    542,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    611,
    122,
    231,
    321,
    412,
    543,
    611,
    411,
    542,
    611,
    122,
    231,
    321,
    412,
    412,
    543,
    611,
    411,
    542,
    611,
    122,
    231,
    321, 412,
    542,
    611,
    122,
    231,
    321, 412,
    543,
    611,
    411,
    542,


  ]
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
                  <div className='card-number'>
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
      <div className="numbers">
        <h1 className='m-0'>140</h1>
      </div>
      <div className="navigation">
        <img className='next' src={Next} alt="" />
        <img className='prev' src={Next} alt="" />
      </div>
    </div>
  );
}

export default App;



