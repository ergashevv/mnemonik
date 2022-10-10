import { useHomeContext } from "../../context/home-context"

const ResultNumbers = () => {
  const {
    cursorW,
    cursor,
    tab,
    dynum,
    randomNumbers: randomnumbers,
  } = useHomeContext()

  const newnumbers = randomnumbers
    .slice(dynum * tab, dynum * (tab + 1))
    .slice(cursor, cursor + parseInt(cursorW!))
  return (
    <>
      {newnumbers?.map((item, key) => (
        <h1 key={key} className="m-0">
          {item}
        </h1>
      ))}
    </>
  )
}
export default ResultNumbers
