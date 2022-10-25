import { useEffect, useRef, useState } from "react"
import { useFlashCardsContext } from "../../context/FlashCardsContext"
import { useHomeContext } from "../../context/home-context"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const TimerFlashCards = () => {
  const { startTime } = useHomeContext()
  const { flashCards, time, setTime } = useFlashCardsContext()
  const { currentPage, setCurrentPage } = useNamesAndFacesContext()

  const timer = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (Number(startTime) <= 0) {
      timer.current = setInterval(() => {
        setTime((numbers) =>
          numbers.map((number, index) =>
            currentPage - 1 === index ? number + 0.01 : number
          )
        )
      }, 10)
      return () => {
        clearInterval(timer.current)
      }
    }
  }, [setTime, currentPage, time, startTime])
  return (
    <>
      <h1 className="flashCards-section__header-timer">
        {time[currentPage - 1].toFixed(2)} s
      </h1>
    </>
  )
}
export default TimerFlashCards
