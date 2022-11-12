import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'
import SelectStartTime from '../../components/start-game-select'
import { useWordsContext } from '../../context/WordsContext'
import BackIcon from '../../assets/images/icons/back-icon.svg'

const WordsStart = () => {
  const {
    setCursorWidth,
    cursorWidth,
    setCurrentPageWords,
    setHighlightedWords,
    navigationWords,
    autoSecondWords,
    setNavigationWords,
    setAutoSecondWords,
  } = useWordsContext()

  const navigate = useNavigate()

  const handleNavigation = (e: ChangeEvent<HTMLSelectElement>) => {
    setNavigationWords(e.target.value)
  }

  const handleAutoSecond = (e: ChangeEvent<HTMLInputElement>) => {
    setAutoSecondWords(+e.target.value)
  }

  const handleNavigate = () => {
    navigate('/words/recall')
    setHighlightedWords(0)
    setCurrentPageWords(1)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setCursorWidth(+e.target.value)
  }

  const handleBack = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!cursorWidth) {
      setCursorWidth(1)
    }
  }, [])

  return (
    <div className='settings'>
      <div className='container'>
        <div className='settings-header'>
          <div className='settings-header__back'>
            <img src={BackIcon} alt='Back' onClick={handleBack} />
          </div>
          <div className='settings-header__title'>So'zlar</div>
        </div>
        <form className='settings-form'>
          <SelectStartTime time={5} />

          <label>Select cursor numbers</label>
          <select defaultValue={cursorWidth} onChange={handleSelect}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>

          <label>Ko'rsatkichni tanlash</label>
          <select
            defaultValue={navigationWords === 'auto' ? 'auto' : 'custom'}
            onChange={handleNavigation}
          >
            <option value='custom'>Custom</option>
            <option value='auto'>Auto</option>
          </select>
          {navigationWords === 'auto' ? (
            <div>
              <label>Avtomatik o'tish vaqti</label>
              <h3>Vaqt: {Number(autoSecondWords) / 10}s</h3>
              <input value={autoSecondWords} onChange={handleAutoSecond} max={50} type='range' />
            </div>
          ) : null}
          <button onClick={handleNavigate}>Boshlash</button>
        </form>
      </div>
    </div>
  )
}

export default WordsStart
