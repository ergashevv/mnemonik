import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router'
import BackIcon from '../../../assets/images/icons/back-icon.svg'
import { useFlashCardsContext } from '../../../context/flash-cards-context'
import { flashCardsData } from '../../../datas/flash-cards/FlashCardsData'
import useScroll from '../../../hooks/use-scroll/use-scroll'

export interface AllPAO {
  paoNumber: number
  person: string
  object: string
  action: string
}

const PaoSettings = () => {
  const {
    paoPerson,
    setPaoPerson,
    paoObject,
    setPaoObject,
    paoAction,
    setPaoAction,
    paoNumbers,
  } = useFlashCardsContext()

  const { scrollDown } = useScroll()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/flash-cards/settings/systems')
  }

  const handlePerson = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPaoPerson((poaPerson) =>
      poaPerson.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const handleObject = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPaoObject((poaObject) =>
      poaObject.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const handleAction = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setPaoAction((poaAction) =>
      poaAction.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue
      )
    )
  }

  const pao: AllPAO[] = []

  for (let i = 0; i < paoNumbers.length; i++) {
    pao.push({
      paoNumber: paoNumbers[i],
      person: paoPerson[i],
      object: paoObject[i],
      action: paoAction[i],
    })
  }

  const removedEmptyPaoObjects = pao.filter((el) => {
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
    localStorage.setItem('pao', JSON.stringify(removedEmptyPaoObjects))
    if (removedEmptyPaoObjects.length === 0) {
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
          <div className='settings-header__title'>PAO</div>
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
                    value={paoPerson[index]}
                    onChange={(e) => handlePerson(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor='action'>Action</label>
                  <input
                    type='text'
                    id='action'
                    name='action'
                    value={paoAction[index]}
                    onChange={(e) => handleAction(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor='object'>Object</label>
                  <input
                    type='text'
                    id='object'
                    name='object'
                    value={paoObject[index]}
                    onChange={(e) => handleObject(e, index)}
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

export default PaoSettings
