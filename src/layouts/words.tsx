import "./main.scss"
import { Route, Routes } from "react-router-dom"
import WordsStart from "../pages/words/WordsStart"
import WordsResult from "../pages/words/WordsResult"
import WordsAnswer from "../pages/words/WordsAnswer"
import WordsRecall from "../pages/words/WordsRecall"

const WordsLayout = () => {
  return (
    <div className="cards-game-page">
      <Routes>
        <Route path="/recall" element={<WordsRecall />} />
        <Route path="/answers" element={<WordsAnswer />} />
        <Route path="/results" element={<WordsResult />} />
        <Route path="/settings" element={<WordsStart />} />
      </Routes>
    </div>
  )
}
export default WordsLayout
