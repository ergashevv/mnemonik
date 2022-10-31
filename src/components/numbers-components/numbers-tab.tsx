import classNames from 'classnames'
import { IContext, useHomeContext } from '../../context/home-context'

interface IProps {
  tab: IContext
}

const NumbersTab = ({ tab }: IProps) => {
  const { cursorW, cursor, randomNumbers } = useHomeContext()

  const slicedRandomNumbers = randomNumbers.slice(
    190 * Number(tab),
    190 * (Number(tab) + 1)
  )

  return (
    <>
      {slicedRandomNumbers.map((item, key) => {
        const isActive = key >= cursor && key < cursor + parseInt(cursorW!)

        const className = classNames('card-number', {
          active: isActive
        })

        return (
          <div className={className} key={key}>
            <p>{item}</p>
          </div>
        )
      })}
    </>
  )
}

export default NumbersTab
