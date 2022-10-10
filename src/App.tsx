import "./assets/styles/main.scss"

import { Route, Routes } from "react-router-dom"
import NumberLayout from "./layouts/numbers"
import CardsLayout from "./layouts/cards"
import DatesLayout from "./layouts/dates"
import HomePage from "./pages/home/home"
import NamesAndFaceLayout from "./layouts/nf"
import WordsLayout from "./layouts/words"
import FlashCardLayout from "./layouts/flash-cards"
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cards/*" element={<CardsLayout />} />
      <Route path="/dates/*" element={<DatesLayout />} />
      <Route path="/numbers/*" element={<NumberLayout />} />

      <Route path="/names-and-faces/*" element={<NamesAndFaceLayout />} />
      <Route path="/words/*" element={<WordsLayout />} />
      <Route path="/flash-cards/*" element={<FlashCardLayout />} />
    </Routes>
  )
}
export default App
