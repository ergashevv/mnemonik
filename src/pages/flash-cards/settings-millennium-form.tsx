import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import useScroll from '../../hooks/useScroll/useScroll'
export interface AllMillennium {
  id: number
  millenniumNumber: number
  millenniumObraz: string
}

const SettingsMillenniumHundreds = () => {
  const { millennium, setMillennium, hundreds } = useFlashCardsContext()
  const { scrollDown } = useScroll()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings/systems/millennium')
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setMillennium((text) =>
      text.map((oldValue, currentIndex) =>
        currentIndex === index + Number(hundreds) ? e.target.value : oldValue
      )
    )
  }

  const allMillennium: AllMillennium[] = []

  millennium.forEach((el, index) => {
    allMillennium.push({
      id: +hundreds,
      millenniumNumber: index,
      millenniumObraz: el,
    })
  })


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
        <div className='down'>
          <img src={BackIcon} alt='down' {...scrollDown} />
        </div>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>Millennium</div>
        </div>
        <form className='settings-form' onSubmit={handleStorage}>
          {Array(1000)
            .fill(undefined)
            .slice(Number(hundreds), Number(hundreds) + 100)
            .map((_, index) => (
              <div key={index + Number(hundreds)} className='settings-form__inner'>
                <h2>
                  {Number(hundreds) === 0 && index < 10
                    ? '00'
                    : Number(hundreds) === 0 && index >= 10 && index < 100
                    ? '0'
                    : ''}
                  {index + Number(hundreds)}
                </h2>
                <div>
                  <label htmlFor='millennium'>Obraz</label>
                  <input
                    type='millennium'
                    id='millennium'
                    name='millennium'
                    value={millennium[index + Number(hundreds)]}
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
