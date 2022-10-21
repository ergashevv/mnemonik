import { useState } from "react"
import { ArrowLeft, ArrowRight, Eye, Rewind } from "react-feather"
import NextPage from "../../components/button-control-component/NextPage"
import PrevPage from "../../components/button-control-component/PrevPage"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"
import "./NF.scss"

const Result = () => {
  const {
    people,
    shuffledPeople,
    currentPage,
    setCurrentPage,
    results,
  } = useNamesAndFacesContext()

  const { prevHandlers } = PrevPage()
  const { nextHandlers } = NextPage()

  const [visibleFirstNames, setVisibleFirstNames] = useState<boolean[]>(
    Array(results?.length).fill(false)
  )

  const [visibleLastNames, setVisibleLastNames] = useState<boolean[]>(
    Array(results?.length).fill(false)
  )

  const correctFirstNames = results.filter(
    (el, index) =>
      el?.firstName?.toLowerCase() ===
      shuffledPeople[index]?.firstName?.toLowerCase()
  )
  const correctLastNames = results.filter(
    (el, index) =>
      el?.lastName?.toLowerCase() ===
      shuffledPeople[index]?.lastName?.toLowerCase()
  )

  const firstPage = () => {
    setCurrentPage(1)
  }

  return (
    <div className="faces">
      <div className="container">
        <section className="faces-section">
          <div className="faces-section__header">
            <p className="faces-section__header-title">
              Umumiy: {results.length} ta
              <br />
              To'g'ri topilganlar:{" "}
              {correctFirstNames.length + correctLastNames.length}ta <br />
            </p>
          </div>
          <div className="faces-section__cards">
            {results?.map((result, index) => {
              const { img, firstName } = result

              if (index === currentPage - 1) {
                return (
                  <article key={index}>
                    <img src={img} alt={firstName} />
                    <form>
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.firstName === ""
                                ? "#fff"
                                : results[index]?.firstName.length > 0 &&
                                  results[index]?.firstName?.toLowerCase() !==
                                    shuffledPeople[
                                      index
                                    ]?.firstName?.toLowerCase()
                                ? "rgba(255, 0, 0, .5)"
                                : "rgba(26, 161, 19, .5)",
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
                            backgroundColor: visibleFirstNames[index]
                              ? "black"
                              : "",
                            color: visibleFirstNames[index] ? "white" : "",
                          }}
                          onClick={() => {
                            setVisibleFirstNames((firstNames) =>
                              firstNames?.map((firstName, firstNameIndex) =>
                                index === firstNameIndex
                                  ? !visibleFirstNames[index]
                                  : firstName
                              )
                            )
                          }}
                        />
                      </div>
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <input
                          readOnly
                          style={{
                            backgroundColor:
                              results[index]?.lastName === ""
                                ? "#fff"
                                : results[index]?.lastName.length > 0 &&
                                  results[index]?.lastName?.toLowerCase() !==
                                    shuffledPeople[
                                      index
                                    ]?.lastName?.toLowerCase()
                                ? "rgba(255, 0, 0, .5)"
                                : "rgba(26, 161, 19, .5)",
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
                            backgroundColor: visibleLastNames[index]
                              ? "black"
                              : "",
                            color: visibleLastNames[index] ? "white" : "",
                          }}
                          onClick={() => {
                            setVisibleLastNames((lastNames) =>
                              lastNames?.map((lastName, lastNameIndex) =>
                                index === lastNameIndex
                                  ? !visibleLastNames[index]
                                  : lastName
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
          <div className="indicator">
            <span>{currentPage}</span>/<span>{people.length}</span>
          </div>
          <div className="control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32} />
            </button>
            <button {...prevHandlers} className="prev-button">
              <ArrowLeft size={32} />
            </button>
            <button {...nextHandlers} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Result
