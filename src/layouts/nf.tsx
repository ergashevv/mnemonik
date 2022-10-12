import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Recall from "../pages/names-and-faces/Recall"
import Answer from "../pages/names-and-faces/Answer"
import Result from "../pages/names-and-faces/Result"
import Start from "../pages/names-and-faces/Start"

const NamesAndFaceLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<Recall />} />
        <Route path="/answers" element={<Answer />} />
        <Route path="/results" element={<Result />} />
        <Route path="/settings" element={<Start />} />
      </Routes>
    </div>
  )
}
export default NamesAndFaceLayout
