import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import TimerComponent from '../../components/timer'
import { useHomeContext } from '../../context/home-context'
import { useWordsContext } from '../../context/words-context'
import useWordsNext from '../../hooks/use-words-button/use-words-next'
import useWordsPrev from '../../hooks/use-words-button/use-words-prev'
import './words.scss'

const WordsRecall = () => {
  const {
    words,
    currentAnswers,
    setAnswers,
    currentPageWords,
    setCurrentPageWords,
    conditionNumber,
  } = useWordsContext()

  const { timerForAnswer } = useHomeContext()

  const { wordsNextButton } = useWordsNext()
  const { wordsPrevButton } = useWordsPrev()

  const navigate = useNavigate()

  const handleInputs = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setAnswers((answers) =>
      answers.map((oldValue, currentIndex) => (currentIndex === index ? e.target.value : oldValue))
    )
  }

  const firstPage = () => {
    setCurrentPageWords(1)
  }

  const handleNavigate = () => {
    navigate('/words/result')
    setCurrentPageWords(1)
  }

  return (
    <section className='words'>
      <div className='container'>
        <div className='words-section'>
          <div className='words-section__header'>
            <TimerComponent time={timerForAnswer} navigateTo='/words/result' />
            <button
              onClick={handleNavigate}
              style={{ textDecoration: 'none' }}
              className='words-section__header-finish'
            >
              Hoziroq tugatish
            </button>
          </div>
          <div className='container-wrapper'>
            <div className='words-section__cards'>
              {currentAnswers?.map((_, index) => {
                return (
                  <article key={index + (currentPageWords - 1) * conditionNumber + 1}>
                    <div className='number'>
                      {index + (currentPageWords - 1) * conditionNumber + 1}.
                    </div>
                    <form>
                      <input
                        type='text'
                        value={currentAnswers[index]}
                        onChange={(e) =>
                          handleInputs(e, index + (currentPageWords - 1) * conditionNumber)
                        }
                      />
                    </form>
                  </article>
                )
              })}
            </div>
            <div className='indicator'>
              <span>{currentPageWords}</span>/
              <span>{(words?.length / conditionNumber).toFixed()}</span>
            </div>
          </div>
          <div className='control-buttons'>
            <button {...wordsPrevButton} className='prev-button'>
              <img src={ArrowLeft} alt='ArrowLeft' />
            </button>
            <button onClick={firstPage} className='first-button'>
              <img src={ChevronsLeft} alt='First Page' />
            </button>
            <button {...wordsNextButton} className='next-button'>
              <img src={ArrowRight} alt='ArrowRight' />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WordsRecall
