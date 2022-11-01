import { useState } from 'react'
import { Eye } from 'react-feather'
import ArrowLeft from '../../assets/images/icons/arrow-left.svg'
import ArrowRight from '../../assets/images/icons/arrow-right.svg'
import ChevronsLeft from '../../assets/images/icons/chevrons-left.svg'
import { useFacesContext } from '../../context/FacesContext'
import useFacesNext from '../../hooks/useFacesButton/useFacesNext'
import useFacesPrev from '../../hooks/useFacesButton/useFacesPrev'
import './NF.scss'

const Result = () => {
  const {
    memorizationPeople,
    recallPeople,
    currentPageFaces,
    setCurrentPageFaces,
    results,
  } = useFacesContext()

  const { facesPrevButton } = useFacesPrev()
  const { facesNextButton } = useFacesNext()

  const [visibleFirstNames, setVisibleFirstNames] = useState<boolean[]>(
    Array(results?.length).fill(false)
  )

  const [visibleLastNames, setVisibleLastNames] = useState<boolean[]>(
    Array(results?.length).fill(false)
  )

  const correctFirstNames = results.filter(
    (el, index) => el?.firstName?.toLowerCase() === recallPeople[index]?.firstName?.toLowerCase()
  )
  const correctLastNames = results.filter(
    (el, index) => el?.lastName?.toLowerCase() === recallPeople[index]?.lastName?.toLowerCase()
  )

  const firstPage = () => {
    setCurrentPageFaces(1)
  }

  return (
    <div className='faces'>
      <div className='container'>
        <section className='faces-section'>
          <div className='faces-section__header'>
            <p className='faces-section__header-title'>
              Umumiy: {2 * results.length} ta
              <br />
              To'g'ri topilganlar: {correctFirstNames.length + correctLastNames.length}ta <br />
            </p>
          </div>
          <div className='faces-section__cards'>
            {results?.map((result, index) => {
              const { img, firstName } = result

              if (index === currentPageFaces - 1) {
                return (
                  <article key={index}>
                    <img src={img} alt={firstName} />
                    <form>
                      <div className='input-wrapper'>
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.firstName === ''
                                ? '#fff'
                                : results[index]?.firstName.length > 0 &&
                                  results[index]?.firstName?.toLowerCase() !==
                                    recallPeople[index]?.firstName?.toLowerCase()
                                ? 'rgba(255, 0, 0, .5)'
                                : 'rgba(26, 161, 19, .5)',
                          }}
                          value={
                            visibleFirstNames[index]
                              ? recallPeople[index]?.firstName
                              : results[index]?.firstName
                          }
                        />
                        <Eye
                          className='faces-section__form-preview'
                          style={{
                            backgroundColor: visibleFirstNames[index] ? 'black' : '',
                            color: visibleFirstNames[index] ? 'white' : '',
                          }}
                          onClick={() => {
                            setVisibleFirstNames((firstNames) =>
                              firstNames?.map((firstName, firstNameIndex) =>
                                index === firstNameIndex ? !visibleFirstNames[index] : firstName
                              )
                            )
                          }}
                        />
                      </div>
                      <div className='input-wrapper'>
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.lastName === ''
                                ? '#fff'
                                : results[index]?.lastName.length > 0 &&
                                  results[index]?.lastName?.toLowerCase() !==
                                    recallPeople[index]?.lastName?.toLowerCase()
                                ? 'rgba(255, 0, 0, .5)'
                                : 'rgba(26, 161, 19, .5)',
                          }}
                          value={
                            visibleLastNames[index]
                              ? recallPeople[index]?.lastName
                              : results[index]?.lastName
                          }
                        />
                        <Eye
                          className='faces-section__form-preview'
                          style={{
                            backgroundColor: visibleLastNames[index] ? 'black' : '',
                            color: visibleLastNames[index] ? 'white' : '',
                          }}
                          onClick={() => {
                            setVisibleLastNames((lastNames) =>
                              lastNames?.map((lastName, lastNameIndex) =>
                                index === lastNameIndex ? !visibleLastNames[index] : lastName
                              )
                            )
                          }}
                        />
                      </div>
                    </form>
                  </article>
                )
              } else {
                return null
              }
            })}
          </div>
          <div className='indicator'>
            <span>{currentPageFaces}</span>/<span>{memorizationPeople.length}</span>
          </div>
          <div className='control-buttons'>
            <button {...facesPrevButton} className='prev-button'>
              <img src={ArrowLeft} alt='ArrowLeft' />
            </button>
            <button onClick={firstPage} className='first-button'>
              <img src={ChevronsLeft} alt='First Page' />
            </button>
            <button {...facesNextButton} className='next-button'>
              <img src={ArrowRight} alt='ArrowRight' />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Result
