import { useCallback, useEffect, useRef, useState } from 'react'
import { useFacesContext } from '../../context/faces-context'
import { useHomeContext } from '../../context/home-context'

const useFacesNext = () => {
  const {
    memorizationPeople,
    setCurrentPageFaces,
    autoSecondFaces,
    navigationFaces,
  } = useFacesContext()

  const { startTime } = useHomeContext()

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const nextPageFaces = useCallback(() => {
    setCurrentPageFaces((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > memorizationPeople?.length) {
        nextPage = 1
      }
      return nextPage
    })
  }, [memorizationPeople?.length, setCurrentPageFaces])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(nextPageFaces, 150)
    } else {
      clearInterval(Number(intervalId.current))
    }

    if (
      navigationFaces === 'auto' &&
      window.location.pathname === '/names-and-faces/memorization' &&
      Number(startTime) < 1
    ) {
      const timer = setInterval(() => {
        setCurrentPageFaces((oldPage: number) => {
          let nextPage = oldPage + 1
          if (nextPage > memorizationPeople?.length) {
            nextPage = 1
          }
          return nextPage
        })
      }, (Number(autoSecondFaces) / 10) * 1000)
      return () => clearInterval(timer)
    }

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [
    nextPageFaces,
    longPress,
    memorizationPeople?.length,
    setCurrentPageFaces,
    autoSecondFaces,
    startTime,
  ])

  return {
    facesNextButton: {
      onClick: nextPageFaces,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useFacesNext
