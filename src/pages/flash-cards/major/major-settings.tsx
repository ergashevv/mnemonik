import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../../context/flash-cards-context'
import useScroll from '../../../hooks/use-scroll/use-scroll'

export interface IMajor {
  majorNumber: number
  majorObraz: string
}

const MajorSettings = () => {
  const { major, setMajor } = useFlashCardsContext()

  const { scrollDown } = useScroll()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setMajor((text) =>
      text.map((oldValue, currentIndex) => (currentIndex === index ? e.target.value : oldValue))
    )
  }

  const allMajor: IMajor[] = []

  major.forEach((el: string, i: number) =>
    allMajor.push({
      majorNumber: i,
      majorObraz: el,
    })
  )

  const removedEmptyObjects = allMajor.filter((el) => {
    if (Object.keys(el.majorObraz).length) {
      return true
    }

    return false
  })

  const handleStorage = (e: any) => {
    e.preventDefault()
    localStorage.setItem('allMajor', JSON.stringify(removedEmptyObjects))
    if (removedEmptyObjects.length === 0) {
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

export default MajorSettings
