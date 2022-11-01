import { Route, Routes } from 'react-router-dom'
import FlashCardsStart from '../pages/flash-cards/FlashCardsStart'
import FlashCardsResult from '../pages/flash-cards/FlashCardsResult'
import FlashCardsRecall from '../pages/flash-cards/FlashCardsRecall'

const FlashCardLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<FlashCardsRecall />} />
        <Route path="/results" element={<FlashCardsResult />} />
        <Route path="/settings" element={<FlashCardsStart />} />
      </Routes>
    </div>
  )
}
export default FlashCardLayout
