import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Game from "../pages/names-and-faces/Recall"
import Answers from "../pages/names-and-faces/Answers"
import Result from "../pages/names-and-faces/Results"
import Start from "../pages/names-and-faces/Start"

const NamesAndFaceLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<Game />} />
        <Route path="/answers" element={<Answers />} />
        <Route path="/results" element={<Result />} />
        <Route path="/settings" element={<Start />} />
      </Routes>
    </div>
  )
}
export default NamesAndFaceLayout
