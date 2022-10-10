import CardGame from "../pages/cards/card-game"
import ResultCard from "../pages/cards/result-card"
import Settings from "../pages/cards/settings"
import StartCard from "../pages/cards/start-card-game"
import './main.scss'
import { Route, Routes } from "react-router-dom"

const CardsLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/game" element={<CardGame />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/start" element={<StartCard />} />
        <Route path="/result" element={<ResultCard />} />
      </Routes>
    </div>
  )
}
export default CardsLayout
