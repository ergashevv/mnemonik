import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../context/FlashCardsContext'
import { flashCardsData } from '../../datas/flash-cards/FlashCardsData'
import useScroll from '../../hooks/useScroll/useScroll'
export interface POA {
  poaNumber: number
  person: string
  object: string
  action: string
}

const SettingsPOA = () => {
  const {
    poaPerson,
    setPoaPerson,
    poaObject,
    setPoaObject,
    poaAction,
    setPoaAction,
    poaNumbers,
  } = useFlashCardsContext()

  const { scrollDown } = useScroll()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handlePerson = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPoaPerson((poaPerson) =>
      poaPerson.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const handleObject = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPoaObject((poaObject) =>
      poaObject.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const handleAction = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPoaAction((poaAction) =>
      poaAction.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const poa: POA[] = []

  for (let i = 0; i < poaNumbers.length; i++) {
    poa.push({
      poaNumber: poaNumbers[i],
      person: poaPerson[i],
      object: poaObject[i],
      action: poaAction[i],
    })
  }

  const removedEmptyPoaObjects = poa.filter((el) => {
    if (
      Object.keys(el.action).length !== 0 &&
      Object.keys(el.object).length !== 0 &&
      Object.keys(el.person).length !== 0
    ) {
      return true
    }

    return false
  })

  const handleStorage = (e: any) => {
    e.preventDefault()
    localStorage.setItem('poa', JSON.stringify(removedEmptyPoaObjects))
    if (removedEmptyPoaObjects.length === 0) {
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
          <div className='settings-header__title'>POA</div>
        </div>
        <form className='settings-form' onSubmit={handleStorage}>
          {flashCardsData.map((data, index) => {
            const { number } = data

            return (
              <div key={index} className='settings-form__inner'>
                <h2>{number}</h2>
                <div>
                  <label htmlFor='person'>Person</label>
                  <input
                    type='text'
                    id='person'
                    name='person'
                    value={poaPerson[index]}
                    onChange={(e) => handlePerson(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor='object'>Object</label>
                  <input
                    type='text'
                    id='object'
                    name='object'
                    value={poaObject[index]}
                    onChange={(e) => handleObject(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor='action'>Action</label>
                  <input
                    type='text'
                    id='action'
                    name='action'
                    value={poaAction[index]}
                    onChange={(e) => handleAction(e, index)}
                  />
                </div>
              </div>
            )
          })}
          <button>Yaratish</button>
        </form>
      </div>
    </div>
  )
}

export default SettingsPOA
