import { Route, Routes } from 'react-router-dom'
import FacesMemorization from '../pages/faces/faces-memorization'
import FacesRecall from '../pages/faces/faces-recall'
import FacesResult from '../pages/faces/faces-result'
import FacesSettings from '../pages/faces/faces-settings'

const DashboardLayout = () => {
  return (
    <div className='cards-game-page'>
      <Routes>
        <Route path='/memorization' element={<FacesMemorization />} />
        <Route path='/recall' element={<FacesRecall />} />
        <Route path='/result' element={<FacesResult />} />
        <Route path='/settings' element={<FacesSettings />} />
      </Routes>
    </div>
  )
}
export default DashboardLayout
