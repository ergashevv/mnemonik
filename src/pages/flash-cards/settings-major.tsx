import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../context/FlashCardsContext'

export interface AllMajor {
  majorNumber: number
  majorObraz: string
}

const SettingsMajor = () => {
  const { major, setMajor, majorNumbers } = useFlashCardsContext()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setMajor((text) =>
      text.map((oldValue, currentIndex) => (currentIndex === index ? e.target.value : oldValue))
    )
  }

  const allMajor: AllMajor[] = []

  for (let i = 0; i < major.length; i++) {
    allMajor.push({
      majorNumber: majorNumbers[i],
      majorObraz: major[i],
    })
  }

  const removedEmptyMajorObjects = allMajor.filter((el) => {
    if (Object.keys(el.majorObraz).length !== 0) {
      return true
    }

    return false
  })

  const handleStorage = (e: any) => {
    e.preventDefault()
    localStorage.setItem('allMajor', JSON.stringify(removedEmptyMajorObjects))
    alert('Muvaffaqqiyatli yaratildi!')
    setTimeout(() => {
      navigate(`/flash-cards/settings/main`)
    }, 1000)
  }

  return (
    <div className='settings'>
      <div className='container'>
        {/* <div className='down'>
          <img src={BackIcon} alt='down' />
        </div> */}
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Major</div>
        </div>
        <form className='settings-form' onSubmit={handleStorage}>
          {Array(100)
            .fill('null')
            .map((_, index) => (
              <div key={index} className='settings-form__inner'>
                <h2>{index < 10 ? `0${index}` : index}</h2>
                <div>
                  <label htmlFor='major'>Obraz</label>
                  <input
                    type='major'
                    id='major'
                    name='major'
                    value={major[index]}
                    onChange={(e) => handleText(e, index)}
                  />
                </div>
              </div>
            ))}
          <button className='fixed-button'>Yaratish</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsMajor
