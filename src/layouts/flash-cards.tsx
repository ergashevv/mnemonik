import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Start from "../pages/flash-cards/FlashCardsStart"
import Results from "../pages/flash-cards/FlashCardsResult"
import Cards from "../pages/flash-cards/FlashCardsRecall"

const FlashCardLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<Cards />} />
        <Route path="/results" element={<Results />} />
        <Route path="/settings" element={<Start />} />
      </Routes>
    </div>
  )
}
export default FlashCardLayout
