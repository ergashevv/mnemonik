import { Route, Routes } from 'react-router-dom'
import NumbersGame from '../pages/numbers/game-page'
import Result from '../pages/numbers/result'
import SettingsPage from '../pages/numbers/settings-page'
import StartNumberGame from '../pages/numbers/start-game'

const NumberLayout = () => {
  return (
    <div className="numbers-game-page">
      <Routes>
        <Route path="/game" element={<NumbersGame />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/start" element={<StartNumberGame />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  )
}
export default NumberLayout
