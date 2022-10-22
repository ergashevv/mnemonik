import "./main.scss"
interface IMnemonics {
  img: any
  name: string
  score: any
  link: string
}

const Mnemonics = ({ img, name, score, link }: IMnemonics) => {
  return (
    <>
      <div className="card-mnemonics">
        <img src={img} alt="" />
        <h2 className="score">{score} ball</h2>
        <h2 className="name">{name}</h2>
        <a href={link}>@bekzod_memory</a>
      </div>
    </>
  )
}
export default Mnemonics
