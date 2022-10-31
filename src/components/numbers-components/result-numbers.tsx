import { useHomeContext } from '../../context/home-context'

const ResultNumbers = () => {
  const {
    cursorW,
    cursor,
    tab,
    dynamic,
    randomNumbers
  } = useHomeContext()

  const newNumbers = randomNumbers
    .slice(dynamic * tab, dynamic * (tab + 1))
    .slice(cursor, cursor + parseInt(cursorW!))
  return (
    <>
      {newNumbers?.map((item, key) => (
        <h1 key={key} className="m-0">
          {item}
        </h1>
      ))}
    </>
  )
}
export default ResultNumbers
