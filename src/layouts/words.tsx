import "./main.scss"
import { Route, Routes } from "react-router-dom"
import Start from "../components/words-component/start-component/WordsStart"
import Results from "../components/words-component/result-component/WordsResult"
import Answer from "../components/words-component/answers-component/WordsAnswer"
import Game from "../components/words-component/game-component/WordsRecall"

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
