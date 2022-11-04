import { Route, Routes } from 'react-router-dom'
import FlashCardsStart from '../pages/flash-cards/FlashCardsStart'
import FlashCardsResult from '../pages/flash-cards/FlashCardsResult'
import FlashCardsRecall from '../pages/flash-cards/FlashCardsRecall'
import SettingsMajor from '../pages/flash-cards/settings-major'
import SettingsMillennium from '../pages/flash-cards/settings-millennium'
import SettingsPOA from '../pages/flash-cards/settings-poa'

const FlashCardLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<FlashCardsRecall />} />
        <Route path="/results" element={<FlashCardsResult />} />
        <Route path="/settings" element={<FlashCardsStart />} />
        <Route path="/settings/major" element={<SettingsMajor />} />
        <Route path="/settings/millennium" element={<SettingsMillennium />} />
        <Route path="/settings/poa" element={<SettingsPOA />} />
      </Routes>
    </div>
  )
}
export default FlashCardLayout
