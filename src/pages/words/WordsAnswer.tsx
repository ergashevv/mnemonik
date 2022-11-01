import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import TimerComponent from '../../components/timer'
import { useHomeContext } from '../../context/home-context'
import { useWordsContext } from '../../context/WordsContext'
import useWordsNext from '../../hooks/useWordsButton/useWordsNext'
import useWordsPrev from '../../hooks/useWordsButton/useWordsPrev'
import './Words.scss'

const WordsAnswer = () => {
  const {
    words,
    wordsPerPage,
    currentAnswers,
    setAnswers,
    cursorWidth,
    currentPageWords,
    setCurrentPageWords,
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
    navigate('/words/results')
    setCurrentPageWords(1)
  }

  return (
    <section className='words'>
      <div className='container'>
        <div className='words-section'>
          <div className='words-section__header'>
            <TimerComponent time={timerForAnswer} navigateTo='/words/results' />
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
                  <article
                    key={
                      cursorWidth === 3 || cursorWidth === 4
                        ? index + (currentPageWords - 1) * 12 + 1
                        : index + (currentPageWords - 1) * 10 + 1
                    }
                  >
                    <div className='number'>
                      {cursorWidth === 3 || cursorWidth === 4
                        ? index + (currentPageWords - 1) * 12 + 1
                        : index + (currentPageWords - 1) * 10 + 1}
                      .
                    </div>
                    <form>
                      <input
                        type='text'
                        value={currentAnswers[index]}
                        onChange={(e) =>
                          handleInputs(
                            e,
                            cursorWidth === 3 || cursorWidth === 4
                              ? index + (currentPageWords - 1) * 12
                              : index + (currentPageWords - 1) * 10
                          )
                        }
                      />
                    </form>
                  </article>
                )
              })}
            </div>
            <div className='indicator'>
              <span>{currentPageWords}</span>/
              <span>
                {cursorWidth === 3 || cursorWidth === 4
                  ? (words?.length / (wordsPerPage + 2)).toFixed()
                  : words?.length / wordsPerPage}
              </span>
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

export default WordsAnswer
