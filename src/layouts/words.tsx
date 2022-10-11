import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Start from "../pages/words/WordsStart"
import Results from "../pages/words/WordsResult"
import Answer from "../pages/words/WordsAnswer"
import Game from "../pages/words/WordsRecall"

const WordsLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<Game />} />
        <Route path="/answers" element={<Answer />} />
        <Route path="/results" element={<Results />} />
        <Route path="/settings" element={<Start />} />
      </Routes>
    </div>
  )
}
export default WordsLayout
