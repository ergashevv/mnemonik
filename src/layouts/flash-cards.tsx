import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Start from "../components/flash-cards-component/start-component/FlashCardsStart"
import Results from "../components/flash-cards-component/results-component/FlashCardsResult"
import Cards from "../components/flash-cards-component/cards-component/FlashCardsRecall"

const FlashCardLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<Cards />} />
        <Route path="/result" element={<Results />} />
        <Route path="/settings" element={<Start />} />
      </Routes>
    </div>
  )
}
export default FlashCardLayout
