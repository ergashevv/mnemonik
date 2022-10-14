import { useHomeContext } from "../../context/home-context"

interface ITabsProps {
  tabNumber: number
}

const Tabs = ({ tabNumber }: ITabsProps) => {
  const { setCursor, tab, setTab } = useHomeContext()
  const resetCursor = (index: number) => {
    setCursor(0)
    setTab(index)
  }
  return (
    <>
      <div className="tabs">
        {Array(tabNumber)
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
