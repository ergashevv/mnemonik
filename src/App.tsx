import './main.scss'

import NumbersGame from './pages/game-page';
import SettingsPage from './pages/settings-page';
import StartNumberGame from './pages/start-game';
import Result from './pages/result';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SettingsPage />} />
        <Route path="/game" element={<NumbersGame />} />
        <Route path="/start" element={<StartNumberGame />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;