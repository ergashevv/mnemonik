import { Link } from 'react-router-dom'
import './main.scss'
interface IHomeCard {
  backgrounImg: string
  link: string
  text: string
}
const HomeBanner = ({ backgrounImg, link, text }: IHomeCard) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgrounImg})` 
      }}
      className="banner"
    >
      <h2>{text}</h2>
      <button>
        <Link to={link}>O’rganish</Link>
      </button>
    </div>
  )
}
export default HomeBanner
