import { useState } from 'react'
import { ArrowLeft, ArrowRight, Eye, Rewind } from 'react-feather'
import { useNamesAndFacesContext } from '../../../context/NamesAndFacesContext' 
import NextPage from '../button-component/NextPage'
import PrevPage from '../button-component/PrevPage'
import '../Styles.css'

const Result = () => {
  const {
    people,
    shuffledPeople,
    currentPageResults,
    setCurrentPageResults,
    results,
  } = useNamesAndFacesContext()

  const { prevResultsHandlers } = PrevPage()
  const { nextResultsHandlers } = NextPage()

  const [previewFirstName, setPreviewFirstName] = useState<boolean>(false)
  const [previewLastName, setPreviewLastName] = useState<boolean>(false)

  const handlePreviewFirstName = () => {
    setPreviewFirstName((current) => !current)
  }

  const handlePreviewLastName = () => {
    setPreviewLastName((current) => !current)
  }

  const [visibleFirstNames, setVisibleFirstNames] = useState<boolean[]>(
    Array(results?.length).fill(false),
  )

  const [visibleLastNames, setVisibleLastNames] = useState<boolean[]>(
    Array(results?.length).fill(false),
  )

  const correctFirstNames = results.filter(
    (el, index) => el?.firstName === shuffledPeople[index]?.firstName,
  )
  const correctLastNames = results.filter(
    (el, index) => el?.lastName === shuffledPeople[index]?.lastName,
  )

  const firstPage = () => {
    setCurrentPageResults(1)
  }

  return (
    <div className="faces">
      <div className="container">
        <section className="faces-section">
          <div className="faces-section__header">
            <p className="faces-section__header-title">
              Umumiy: {results.length} ta
              <br />
              To'g'ri topilganlar:{' '}
              {correctFirstNames.length + correctLastNames.length}ta <br />
            </p>
          </div>
          <div className="faces-section__cards">
            {results?.map((result, index) => {
              const { img, firstName } = result

              if (index === currentPageResults - 1) {
                return (
                  <article key={index}>
                    <img src={img} alt={firstName} />
                    <form>
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.firstName === ''
                                ? 'rgb(255, 255, 255)'
                                : results[index]?.firstName !==
                                    shuffledPeople[index]?.firstName &&
                                  results[index]?.firstName.length > 0
                                ? 'rgba(255, 0, 0, .5)'
                                : results[index]?.firstName !==
                                    shuffledPeople[index]?.firstName &&
                                  results[index]?.firstName.length > 0
                                ? 'rgba(26,161, 19, .5)'
                                : 'rgba(26, 161, 19, .5)',
                          }}
                          value={
                            visibleFirstNames[index]
                              ? shuffledPeople[index]?.firstName
                              : results[index]?.firstName
                          }
                        />
                        <Eye
                          className="faces-section__form-preview"
                          style={{
                            backgroundColor: previewFirstName
                              ? 'black'
                              : 'white',
                            color: previewFirstName ? 'white' : 'black',
                          }}
                          onClick={() => {
                            setVisibleFirstNames((firstNames) =>
                              firstNames?.map((firstName, firstNameIndex) =>
                                index === firstNameIndex
                                  ? !visibleFirstNames[index]
                                  : firstName,
                              ),
                            )

                            handlePreviewFirstName()
                          }}
                        />
                      </div>
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.lastName === ''
                                ? 'rgb(255, 255, 255)'
                                : results[index]?.lastName !==
                                    shuffledPeople[index]?.lastName &&
                                  results[index].lastName.length > 0
                                ? 'rgb(255, 0, 0, .5)'
                                : 'rgba(26, 161, 19, .5)',
                          }}
                          value={
                            visibleLastNames[index]
                              ? shuffledPeople[index]?.lastName
                              : results[index]?.lastName
                          }
                        />
                        <Eye
                          className="faces-section__form-preview"
                          style={{
                            backgroundColor: previewLastName
                              ? 'black'
                              : 'white',
                            color: previewLastName ? 'white' : 'black',
                          }}
                          onClick={() => {
                            setVisibleLastNames((lastNames) =>
                              lastNames?.map((lastName, lastNameIndex) =>
                                index === lastNameIndex
                                  ? !visibleLastNames[index]
                                  : lastName,
                              ),
                            )

                            handlePreviewLastName()
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
          <div className="faces-section__indicator">
            <span>{currentPageResults}</span>/<span>{people.length}</span>
          </div>
          <div className="faces-section__control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevResultsHandlers} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextResultsHandlers} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Result
