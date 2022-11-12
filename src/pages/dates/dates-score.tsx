import { useDatedContext } from '../../context/date-context'
const DatesScore = () => {
  const { data, even, userDate } = useDatedContext()

  return (
    <>
      <h4>Sizning natijangiz !</h4>
      <div className='start-date-game'>
        <div className='inputs'>
          <div className='inp'>
            {userDate.map((value, key) => (
              <input
                key={key}
                style={{
                  color: value !== data[key] ? 'red' : 'green',
                }}
                readOnly
                value={userDate[key]}
                type='text'
              />
            ))}
          </div>
          <div className='text'>
            {even.map((item, key) => (
              <p key={key}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default DatesScore
