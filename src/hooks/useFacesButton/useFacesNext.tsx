import { useCallback, useEffect, useRef, useState } from 'react'
import { useFacesContext } from '../../context/FacesContext'

const useFacesNext = () => {
  const { memorizationPeople, setCurrentPageFaces } = useFacesContext()

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

    return () => {
      clearInterval(Number(intervalId.current))
    }
  }, [nextPageFaces, longPress])

  return {
    facesNextButton: {
      onClick: nextPageFaces,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false)
    }
  }
}

export default useFacesNext
