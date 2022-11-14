import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
export interface AllMillennium {
  millenniumNumber: number
  millenniumObraz: string
}

const SettingsMillenniumHundreds = () => {
  const { millennium, setMillennium, millenniumNumbers } = useFlashCardsContext()

  const navigate = useNavigate()

  const hundredNumbers = JSON.parse(localStorage.getItem('hundreds')!)
  const handleBack = () => {
    navigate('/flash-cards/settings/systems/millennium')
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setMillennium((text) =>
      text.map((oldValue, currentIndex) =>
        currentIndex === index + Number(hundredNumbers) ? e.target.value : oldValue
      )
    )
  }

  const allMillennium: AllMillennium[] = []

  for (let i = 0; i < millennium.length; i++) {
    allMillennium.push({
      millenniumNumber: millenniumNumbers[i],
      millenniumObraz: millennium[i],
    })
  }

  const removedEmptyMillenniumObjects = allMillennium.filter((el) => {
    if (Object.keys(el.millenniumObraz).length !== 0) {
      return true
    }

    return false
  })

  const handleStorage = (e: any) => {
    e.preventDefault()
    localStorage.setItem('allMillennium', JSON.stringify(removedEmptyMillenniumObjects))
    if (removedEmptyMillenniumObjects.length === 0) {
      alert('Qayta yarating')
    } else {
      alert('Muvaffaqqiyatli yaratildi!')
      navigate(`/flash-cards/settings/main`)
    }
  }

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Millennium</div>
        </div>
        <form className='settings-form' onSubmit={handleStorage}>
          {Array(1000)
            .fill(undefined)
            .slice(Number(hundredNumbers), Number(hundredNumbers) + 100)
            .map((_, index) => (
              <div key={index + Number(hundredNumbers)} className='settings-form__inner'>
                <h2>
                  {Number(hundredNumbers) === 0 && index < 10
                    ? '00'
                    : Number(hundredNumbers) === 0 && index >= 10 && index < 100
                    ? '0'
                    : ''}
                  {index + Number(hundredNumbers)}
                </h2>
                <div>
                  <label htmlFor='millennium'>Obraz</label>
                  <input
                    type='millennium'
                    id='millennium'
                    name='millennium'
                    value={millennium[index + Number(hundredNumbers)]}
                    onChange={(e) => handleText(e, index)}
                  />
                </div>
              </div>
            ))}
          <button>Yaratish</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsMillenniumHundreds
