import { useCallback, useEffect, useRef, useState } from "react"
import { useNamesAndFacesContext } from "../../context/NamesAndFacesContext"

const useFacesPrev = () => {
  const {
    memorizationPeople,
    setCurrentPageFaces,
  } = useNamesAndFacesContext()

  const [longPress, setLongPress] = useState(false)

  const intervalId = useRef<null | ReturnType<typeof setInterval>>(null)

  const prevPageFaces = useCallback(() => {
    setCurrentPageFaces((oldPage: number) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = memorizationPeople?.length
      }
      return prevPage
    })
  }, [memorizationPeople?.length, setCurrentPageFaces])

  useEffect(() => {
    if (longPress) {
      intervalId.current = setInterval(prevPageFaces, 150)
    } else {
      clearTimeout(Number(intervalId.current))
    }

    return () => {
      clearTimeout(Number(intervalId.current))
    }
  }, [prevPageFaces, longPress])


  return {
    facesPrevButton: {
      onClick: prevPageFaces,
      onMouseDown: () => setLongPress(true),
      onMouseUp: () => setLongPress(false),
      onMouseLeave: () => setLongPress(false),
      onTouchStart: () => setLongPress(true),
      onTouchEnd: () => setLongPress(false),
    },
  }
}

export default useFacesPrev
