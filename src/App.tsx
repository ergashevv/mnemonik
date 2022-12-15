import { Route, Routes } from 'react-router-dom'
import './assets/styles/ControlButtons.scss'
import './assets/styles/main.scss'
import './assets/styles/customize.scss'
import './assets/styles/StartStyles.scss'
import CardsLayout from './layouts/cards'
import DatesLayout from './layouts/dates'
import FlashCardLayout from './layouts/flash-cards-layout'
import NamesAndFaceLayout from './layouts/faces-layout'
import NumberLayout from './layouts/numbers'
import WordsLayout from './layouts/words-layout'
import HomePage from './pages/home/home'
import SignIn from './pages/auth/signin'
import Login from './pages/auth/login'
import DashboardLayout from './layouts/dashboard-layouts'
const token = localStorage.getItem('token')

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cards/*' element={<CardsLayout />} />
      <Route path='/dates/*' element={<DatesLayout />} />
      {token && <Route path='/dashboard/*' element={<DashboardLayout />} />}
      <Route path='/numbers/*' element={<NumberLayout />} />

      <Route path='/names-and-faces/*' element={<NamesAndFaceLayout />} />
      <Route path='/words/*' element={<WordsLayout />} />
      <Route path='/flash-cards/*' element={<FlashCardLayout />} />
    </Routes>
  )
}
export default App
