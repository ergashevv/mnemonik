import { useMemo, useState } from 'react'
import { Eye } from 'react-feather'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import { useWordsContext } from '../../context/words-context'
import useWordsNext from '../../hooks/use-words-button/use-words-next'
import useWordsPrev from '../../hooks/use-words-button/use-words-prev'
import './words.scss'

const WordsResult = () => {
  const {
    words,
    currentAnswers,
    answers,
    currentPageWords,
    setCurrentPageWords,
    conditionNumber,
  } = useWordsContext()

  const { wordsPrevButton } = useWordsPrev()
  const { wordsNextButton } = useWordsNext()

  const [visibleInputs, setVisibleInputs] = useState(Array(answers?.length).fill(false))

  const counterHandler = useMemo(() => {
    let count = 0
    answers?.forEach((item: any, k: any) => {
      if (item === words[k]) {
        count++
      }
    })
    return count
  }, [])
  const firstPage = () => {
    setCurrentPageWords(1)
  }

  return (
    <div className='words'>
      <div className='container'>
        <div className='words-section'>
          <div className='words-section__correct-answers'>
            <p>
              Umumiy: {words.length} ta
              <br />
              To'g'ri topilganlar: {counterHandler}ta <br />
            </p>
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
                      <div style={{ position: 'relative' }}>
                        <input
                          readOnly
                          type='text'
                          style={{
                            backgroundColor:
                              answers[index + (currentPageWords - 1) * conditionNumber] === ''
                                ? '#fff'
                                : answers[index + (currentPageWords - 1) * conditionNumber].length >
                                    0 &&
                                  words[index + (currentPageWords - 1) * conditionNumber]
                                    ?.toLowerCase()
                                    .trim() !==
                                    answers[index + (currentPageWords - 1) * conditionNumber]
                                      ?.toLowerCase()
                                      .trim()
                                ? 'rgba(255, 0, 0, .5)'
                                : 'rgba(26, 161, 19, .5)',
                          }}
                          value={
                            visibleInputs[index + (currentPageWords - 1) * conditionNumber]
                              ? words[index + (currentPageWords - 1) * conditionNumber]
                              : answers[index + (currentPageWords - 1) * conditionNumber]
                          }
                        />
                        <Eye
                          className='form-preview'
                          style={{
                            backgroundColor:
                              visibleInputs[index + (currentPageWords - 1) * conditionNumber] &&
                              'black',
                            color:
                              visibleInputs[index + (currentPageWords - 1) * conditionNumber] &&
                              'white',
                            padding:
                              visibleInputs[index + (currentPageWords - 1) * conditionNumber] &&
                              '.1rem',
                          }}
                          onClick={() => {
                            setVisibleInputs((inputs) =>
                              inputs?.map((input, inputIndex) =>
                                index + (currentPageWords - 1) * conditionNumber === inputIndex
                                  ? !visibleInputs[index + (currentPageWords - 1) * conditionNumber]
                                  : input
                              )
                            )
                          }}
                        />
                      </div>
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
    </div>
  )
}

export default WordsResult
