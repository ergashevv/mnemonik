import { useNavigate } from 'react-router'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import StartGameModal from '../../components/start-game'
import TimerComponent from '../../components/timer'
import { useHomeContext } from '../../context/home-context'
import { useWordsContext } from '../../context/words-context'
import useWordsNext from '../../hooks/use-words-button/use-words-next'
import useWordsPrev from '../../hooks/use-words-button/use-words-prev'
import './words.scss'

const WordsMemorization = () => {
  const {
    words,
    currentWords,
    cursorWidth,
    highlightedWords,
    setHighlightedWords,
    currentPageWords,
    setCurrentPageWords,
    navigationWords,
    conditionNumber,
  } = useWordsContext()

  const { startTime, timerForRecall } = useHomeContext()

  const { prevHighlightedButton } = useWordsPrev()
  const { nextHighlightedButton } = useWordsNext()

  const navigate = useNavigate()

  const firstPage = () => {
    setHighlightedWords(0)
    setCurrentPageWords(1)
  }

  const handleNavigate = () => {
    navigate('/words/recall')
    setCurrentPageWords(1)
  }

  return (
    <>
      {Number(startTime) > 0 ? (
        <StartGameModal time={String(startTime)} />
      ) : (
        <div className='words'>
          <div className='container'>
            <StartGameModal time={startTime!} />
            <div className='words-section'>
              <div className='words-section__header'>
                {Number(startTime) === 0 && (
                  <TimerComponent time={timerForRecall} navigateTo='/words/recall' />
                )}
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
                  {currentWords?.map((word, index) => (
                    <article
                      key={index}
                      style={{
                        backgroundColor:
                          index >= highlightedWords && index < highlightedWords + cursorWidth
                            ? '#d69358'
                            : '',
                      }}
                    >
                      <div className='number'>
                        {index + (currentPageWords - 1) * conditionNumber + 1}.
                      </div>
                      <div className='word'>{word}</div>
                    </article>
                  ))}
                </div>
                <div className='indicator'>
                  <span>{currentPageWords}</span>/
                  <span>{(words?.length / conditionNumber).toFixed()}</span>
                </div>
              </div>
              <div className='control-buttons'>
                <button
                  style={{ display: navigationWords === 'auto' ? 'none' : 'all' }}
                  {...prevHighlightedButton}
                  className='prev-button'
                >
                  <img src={ArrowLeft} alt='ArrowLeft' />
                </button>
                <button
                  style={{ display: navigationWords === 'auto' ? 'none' : 'all' }}
                  onClick={firstPage}
                  className='first-button'
                >
                  <img src={ChevronsLeft} alt='First Page' />
                </button>
                <button
                  style={{ display: navigationWords === 'auto' ? 'none' : 'all' }}
                  {...nextHighlightedButton}
                  className='next-button'
                >
                  <img src={ArrowRight} alt='ArrowRight' />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WordsMemorization
