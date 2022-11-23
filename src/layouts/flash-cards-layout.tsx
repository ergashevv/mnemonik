import { Route, Routes } from 'react-router-dom'
import MajorMemorization from '../pages/flash-cards/major/major-memorization'
import MajorResult from '../pages/flash-cards/major/major-result'
import MajorSettings from '../pages/flash-cards/major/major-settings'
import MillenniumMemorization from '../pages/flash-cards/millennium/millennium-memorization'
import MillenniumResult from '../pages/flash-cards/millennium/millennium-result'
import MillenniumSettingsForm from '../pages/flash-cards/millennium/millennium-settings-form'
import MillenniumSettingsHundreds from '../pages/flash-cards/millennium/millennium-settings-hundreds'
import PaoMemorization from '../pages/flash-cards/pao/pao-memorization'
import PaoResult from '../pages/flash-cards/pao/pao-result'
import PaoSettings from '../pages/flash-cards/pao/pao-settings'
import PoaMemorization from '../pages/flash-cards/poa/poa-memorization'
import PoaResult from '../pages/flash-cards/poa/poa-result'
import PoaSettings from '../pages/flash-cards/poa/poa-settings'
import FlashCardsSettings from '../pages/flash-cards/settings/flash-cards-settings'
import MainSettings from '../pages/flash-cards/settings/main-settings'
import SystemSettings from '../pages/flash-cards/settings/system-settings'

const FlashCardLayout = () => {
  return (
    <div className='cards-game-page'>
      <Routes>
        <Route path='/major/memorization' element={<MajorMemorization />} />
        <Route path='/millennium/memorization' element={<MillenniumMemorization />} />
        <Route path='/poa/memorization' element={<PoaMemorization />} />
        <Route path='/pao/memorization' element={<PaoMemorization />} />

        <Route path='/major/result' element={<MajorResult />} />
        <Route path='/millennium/result' element={<MillenniumResult />} />
        <Route path='/poa/result' element={<PoaResult />} />
        <Route path='/pao/result' element={<PaoResult />} />

        <Route path='/settings' element={<FlashCardsSettings />} />
        <Route path='/settings/main' element={<MainSettings />} />
        <Route path='/settings/systems' element={<SystemSettings />} />

        <Route path='/settings/systems/major' element={<MajorSettings />} />
        <Route path='/settings/systems/millennium' element={<MillenniumSettingsHundreds />} />
        <Route path='/settings/systems/millennium/hundreds' element={<MillenniumSettingsForm />} />
        <Route path='/settings/systems/poa' element={<PoaSettings />} />
        <Route path='/settings/systems/pao' element={<PaoSettings />} />
      </Routes>
    </div>
  )
}
export default FlashCardLayout
