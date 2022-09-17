import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './main.scss'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NumbersGame from './pages/game-page';
import SettingsPage from './pages/settings-page';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SettingsPage />} />
          <Route path="/game" element={<NumbersGame />} />
        </Routes>
      </BrowserRouter>,

    </>
  )
}


export default App;



