import "./assets/styles/main.scss"

import { Route, Routes } from "react-router-dom"
import NumberLayout from "./layouts/numbers"
import CardsLayout from "./layouts/cards"
import DatesLayout from "./layouts/dates"
import HomePage from "./pages/home/home"
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards/*" element={<CardsLayout />} />

      <Route path="/dates/*" element={<DatesLayout />} />
      <Route path="/numbers/*" element={<NumberLayout />} />
    </Routes>
  )
}
export default App
