import { Route, Routes } from 'react-router-dom'
import FlashCardsStart from '../pages/flash-cards/FlashCardsStart'
import MajorResult from '../pages/flash-cards/major-result'
import SettingsMajor from '../pages/flash-cards/settings-major'
import SettingsMillennium from '../pages/flash-cards/settings-millennium-hundreds'
import SettingsPOA from '../pages/flash-cards/settings-poa'
import SettingsSystem from '../pages/flash-cards/settings-system'
import SettingsPAO from '../pages/flash-cards/settings-pao'
import SettingsMillenniumHundreds from '../pages/flash-cards/settings-millennium-form'
import SettingsMain from '../pages/flash-cards/settings-main'
import MajorMemorize from '../pages/flash-cards/major-memorize'
import MillenniumMemorize from '../pages/flash-cards/millennium-memorize'
import PoaMemorize from '../pages/flash-cards/poa-memorize'
import PaoMemorize from '../pages/flash-cards/pao-memorize'
import PoaResult from '../pages/flash-cards/poa-result'
import PaoResult from '../pages/flash-cards/pao-result'
import MillenniumResult from '../pages/flash-cards/millennium-result'

const FlashCardLayout = () => {
  return (
    <div className='cards-game-page'>
      <Routes>
        <Route path='/major/memorization' element={<MajorMemorize />} />
        <Route path='/millennium/memorization' element={<MillenniumMemorize />} />
        <Route path='/poa/memorization' element={<PoaMemorize />} />
        <Route path='/pao/memorization' element={<PaoMemorize />} />

        <Route path='/major/results' element={<MajorResult />} />
        <Route path='/millennium/results' element={<MillenniumResult />} />
        <Route path='/poa/results' element={<PoaResult />} />
        <Route path='/pao/results' element={<PaoResult />} />

        <Route path='/settings' element={<FlashCardsStart />} />
        <Route path='/settings/main' element={<SettingsMain />} />
        <Route path='/settings/systems' element={<SettingsSystem />} />

        <Route path='/settings/systems/major' element={<SettingsMajor />} />
        <Route path='/settings/systems/millennium' element={<SettingsMillennium />} />
        <Route
          path='/settings/systems/millennium/hundreds'
          element={<SettingsMillenniumHundreds />}
        />
        <Route path='/settings/systems/poa' element={<SettingsPOA />} />
        <Route path='/settings/systems/pao' element={<SettingsPAO />} />
      </Routes>
    </div>
  )
}
export default FlashCardLayout
