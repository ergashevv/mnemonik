import { useHomeContext } from "../../context/home-context"
import React, { useState } from "react"
interface ITabsProps {
  tabnumber: number
}

const Tabs = ({ tabnumber }: ITabsProps) => {
  const { setCursor, tab, setTab } = useHomeContext()
  //   const [tab, setTab] = useState<number>(0)
  const resetCursor = (index: number) => {
    setCursor(0)
    setTab(index)
  }
  return (
    <>
      <div className="tabs">
        {Array(tabnumber)
          .fill(null)
          .map((_, index) => {
            const className = tab === index ? "active" : undefined
            const handleClick = () => resetCursor(index)
            return (
              <button className={className} onClick={handleClick} key={index}>
                {index + 1}
              </button>
            )
          })}
      </div>
    </>
  )
}
export default Tabs
