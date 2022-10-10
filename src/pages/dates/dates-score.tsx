import { useDatedContext } from "../../context/date-context"
const DatesScore = () => {
  const { data, even, userdate } = useDatedContext()
  console.log(userdate)
  return (
    <>
      <div className="start-date-game">
        <div className="inputs">
          <div className="inp">
            {userdate.map((value, key) => (
              <input
                style={{
                  color: value !== data[key] ? "red" : "green",
                }}
                readOnly
                value={userdate[key]}
                type="text"
              />
            ))}
          </div>
          <div className="text">
            {even.map((item, key) => (
              <p
                key={key}
                style={{
                  marginBottom: "3px",
                }}
              >
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default DatesScore
