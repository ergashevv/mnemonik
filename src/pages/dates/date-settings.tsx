import { useNavigate } from 'react-router-dom'
import '../../assets/styles/StartStyles.scss'
import SelectStartTime from '../../components/start-game-select'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useState } from 'react'
const DatesSettings = () => {
  const navigate = useNavigate()
  const [userDate, setUserDate] = useState<any>([])
  const [inputData, setInputData] = useState<any>('')
  const [create, setCreate] = useState(false)

  const handleNavigate = () => {
    navigate('/dates/game')
  }

  const handleBack = () => {
    navigate('/')
  }

  const submitHandler = (e: any) => {
    e.preventDefault()
    setUserDate([...userDate, inputData])
    setInputData('')
  }
  const handleDelete = (key: any) => {
    setUserDate((userDate: any) => [...userDate].splice(key, 1))
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <div className="settings-header__back">
            <img src={BackIcon} alt="Back" onClick={handleBack} />
          </div>
          <div className="settings-header__title">Sanalar</div>
        </div>
        <form className="settings-form">
          <label>Select memorization time</label>
          <SelectStartTime time={5} />
          <button onClick={handleNavigate}>Start</button>
        </form>
        {
          userDate?.map((item: any, key: number) => (
            <div style={{
              display: "flex"
            }}>
              <p>{item}</p>
              <button onClick={() => handleDelete(key)}>DELETE</button>
            </div>
          ))
        }
        {
          create &&
          <form onSubmit={(e) => submitHandler(e)}>
            <input value={inputData} onChange={(e) => setInputData(e.target.value)} placeholder='write something' type="text" />
            <button type='submit'>done</button>
          </form>
        }
        <button onClick={() => setCreate(true)}>Create</button>
      </div>
    </div>
  )
}
export default DatesSettings
