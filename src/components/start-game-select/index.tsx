import { useHomeContext } from '../../context/home-context'
import { useEffect } from 'react'

interface ITimeProps {
  time: number
}

const SelectStartTime = ({ time }: ITimeProps) => {
  const { setStartTime } = useHomeContext()

  useEffect(() => {
    if (time) {
      setStartTime('5')
    }
  }, [setStartTime, time])

  return (
    <>
      <div className="select-start">
        <select
          defaultValue={time}
          onChange={(e: any) => setStartTime(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="60">60</option>
        </select>
      </div>
    </>
  )
}
export default SelectStartTime
