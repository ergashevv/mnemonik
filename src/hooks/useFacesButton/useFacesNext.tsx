import { useCallback, useEffect, useRef, useState } from "react"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const useFacesNext = () => {
  const {
    people,
    setCurrentPageFaces,
  } = useNamesAndFacesContext()

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const nextPageFaces = useCallback(() => {
    setCurrentPageFaces((oldPage: number) => {
      let nextPage = oldPage + 1
      if (nextPage > people?.length) {
        nextPage = 1
      }
      return nextPage
    })
  }, [people?.length, setCurrentPageFaces])

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
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useFacesNext
