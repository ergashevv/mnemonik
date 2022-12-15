import { Route, Routes } from 'react-router-dom'
import UserProfiile from '../pages/dashboard/user-profile'

const NamesAndFaceLayout = () => {
  return (
    <div className='cards-game-page'>
      <Routes>
        <Route path='/user-profile' element={<UserProfiile />} />
      </Routes>
    </div>
  )
}
export default NamesAndFaceLayout
