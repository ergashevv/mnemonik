
import { Route, Routes } from 'react-router-dom'
import DatesGamePage from '../pages/dates/date-game'
import DatesSettings from '../pages/dates/date-settings'
import DatesStartGame from '../pages/dates/start-game'
import DatesScore from '../pages/dates/dates-score'

const DatesLayout = () => {
  return (
        <div className="cards-main-page">
            <Routes>
                <Route path="/game" element={<DatesGamePage />} />
                <Route path="/settings" element={<DatesSettings />} />
                <Route path="/start" element={<DatesStartGame />} />
                <Route path="/result" element={<DatesScore />} />
            </Routes>
        </div>
  )
}
export default DatesLayout
