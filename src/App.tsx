import { Route, Routes } from "react-router-dom"
import "./assets/styles/ControlButtons.scss"
import "./assets/styles/main.scss"
import "./assets/styles/StartStyles.scss"
import CardsLayout from "./layouts/cards"
import DatesLayout from "./layouts/dates"
import FlashCardLayout from "./layouts/flash-cards"
import NamesAndFaceLayout from "./layouts/nf"
import NumberLayout from "./layouts/numbers"
import WordsLayout from "./layouts/words"
import HomePage from "./pages/home/home"

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
