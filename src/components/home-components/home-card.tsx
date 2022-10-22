import { Link } from "react-router-dom"
import "./main.scss"
interface IHomeCard {
  img: any
  link: string
  text: string
}
const HomeCategoryCard = ({ img, link, text }: IHomeCard) => {
  return (
    <Link to={link} className="card">
      <img src={img} alt="" />
      <h3>{text}</h3>
    </Link>
  )
}

export default HomeCategoryCard
