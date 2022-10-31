import { useHomeContext } from '../../context/home-context'
import './main.scss'
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
      <div className="tab">
        {Array(tabNumber)
          .fill(null)
          .map((_, index) => {
            const className = tab === index ? 'active' : undefined
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
