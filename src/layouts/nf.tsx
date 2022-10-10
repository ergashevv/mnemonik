import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Game from "../components/names-and-faces-component/game-component/Recall"
import Answers from "../components/names-and-faces-component/answers-component/Answers"
import Result from "../components/names-and-faces-component/result-component/Results"
import Start from "../components/names-and-faces-component/start-component/Start"

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
