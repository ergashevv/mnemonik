import { Route, Routes } from 'react-router-dom'
import WordsMemorization from '../pages/words/words-memorization'
import WordsRecall from '../pages/words/words-recall'
import WordsResult from '../pages/words/words-result'
import WordsSettings from '../pages/words/words-settings'

const WordsLayout = () => {
  return (
    <div className='cards-game-page'>
      <Routes>
        <Route path='/memorization' element={<WordsMemorization />} />
        <Route path='/recall' element={<WordsRecall />} />
        <Route path='/result' element={<WordsResult />} />
        <Route path='/settings' element={<WordsSettings />} />
      </Routes>
    </div>
  )
}
export default WordsLayout
