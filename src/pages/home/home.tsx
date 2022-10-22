import { Link } from "react-router-dom"
import "./main.scss"
import Logo from "../../assets/images/logotype.png"
import Hmaburger from "../../assets/images/menu.svg"
import Numbers from "../../assets/images/numbers.svg"
import Cards from "../../assets/images/card.svg"
import Face from "../../assets/images/face.svg"
import Dates from "../../assets/images/dates.svg"
import Words from "../../assets/images/translate.svg"
import Flash from "../../assets/images/flash.svg"
import TimerImg from "../../assets/images/timer.png"
import HomeCategoryCard from "../../components/home-components/home-card"
import HomeBanner from "../../components/home-components/Banner"
import Bgi from "../../assets/images/Banner.png"
import Mnemonics from "../../components/mnemonics"
import Behzodakaimg from "../../assets/images/behzodaka.png"
import ProductCard from "../../components/product-card"
import ContactUsTelegram from "../../components/contact-us-telegram"
import BlackWhiteLogo from "../../assets/images/bgw.svg"
const HomePage = () => {
  const CardsData = [
    {
      img: Numbers,
      link: "/numbers/settings",
      text: "Raqamlar",
    },
    {
      img: Cards,
      link: "/cards/settings",
      text: "Playing Cards",
    },
    {
      img: Face,
      link: "/names-and-faces/settings",
      text: "Yuzlar",
    },
    {
      img: Dates,
      link: "/dates/settings",
      text: "Sanalar",
    },
    {
      img: Words,
      link: "/words/settings",
      text: "So’zlar",
    },
    {
      img: Flash,
      link: "/flash-cards/settings",
      text: "Flash Cards",
    },
  ]

  const mnemonics = [
    {
      img: Behzodakaimg,
      link: "https://t.me/bekzod_memory",
      name: "MegaMind",
      score: 1827,
    },
    {
      img: Behzodakaimg,
      link: "https://t.me/bekzod_memory",
      name: "MegaMind",
      score: 1827,
    },
    {
      img: Behzodakaimg,
      link: "https://t.me/bekzod_memory",
      name: "MegaMind",
      score: 1830,
    },
  ]

  const products = [
    {
      img: TimerImg,
      title: "LED Pomodoro Taymer",
      cost: "199.000",
    },
    {
      img: TimerImg,
      title: "LED Pomodoro Taymer",
      cost: "199.000",
    },
    {
      img: TimerImg,
      title: "LED Pomodoro Taymer",
      cost: "199.000",
    },
    {
      img: TimerImg,
      title: "LED Pomodoro Taymer",
      cost: "199.000",
    },
    {
      img: TimerImg,
      title: "LED Pomodoro Taymer",
      cost: "199.000",
    },
    {
      img: TimerImg,
      title: "LED Pomodoro Taymer",
      cost: "199.000",
    },
  ]

  const Banner = {
    text: "Chet tili so'zlari va imtihon javoblarini 10 barobar tezroq eslab qolish usuli",
    link: "/",
    backgrounImg: Bgi,
  }
  const largest: any = mnemonics.reduce(
    (prev, curr) => (prev.score > curr.score ? prev : curr),
    { score: 0 }
  )
  const largestIndex = mnemonics.findIndex(
    ({ score }) => largest.score === score
  )

  const previousSecondElementOfTheArray = mnemonics.splice(largestIndex, 1)

  console.log(mnemonics) // [1, 3, 4]

  console.log(previousSecondElementOfTheArray) // [2]

  return (
    <>
      <div className="home container">
        <div className="home-header">
          <Link to="/">
            <img src={Logo} alt="" className="logo" />
          </Link>
          <div className="menu">
            <button>
              <img src={Hmaburger} alt="" />
            </button>
          </div>
        </div>
        <HomeBanner
          text={Banner.text}
          backgrounImg={Banner.backgrounImg}
          link={Banner.link}
        />
        <div className="category-games">
          <h2>Yo’nalishlar</h2>
          <div className="game-cards">
            {CardsData.map((item, key) => (
              <HomeCategoryCard
                text={item.text}
                img={item.img}
                link={item.link}
                key={key}
              />
            ))}
          </div>
        </div>
        <div className="reyting-mnemics">
          <div className="titles">
            <h2>Mnemonistlar</h2>
            <h3>Hammasini ko'rish</h3>
          </div>
          <div className="top-reyting">
            <img src={largest.img} alt="" />
            <h2>{largest.score} ball</h2>
            <h3>{largest.name}</h3>
            <a href={largest.link}>@bekzod_memory</a>
          </div>
          <div className="reyting">
            {mnemonics.map((item, key) => (
              <Mnemonics
                name={item.name}
                link={item.link}
                img={item.img}
                score={item.score}
                key={key}
              />
            ))}
          </div>
        </div>
        <div className="product-cards">
          <div className="titles">
            <h2>Top mahsulotlar</h2>
            <h3>Hammasini ko'rish</h3>
          </div>
          <div className="products">
            {products.map((item, key) => (
              <ProductCard
                cost={item.cost}
                img={item.img}
                title={item.title}
                key={key}
              />
            ))}
          </div>
        </div>
        <div className="contact">
          <ContactUsTelegram />
        </div>
        <div className="links">
          <Link to="/">Bosh sahifa</Link>
          <Link to="/">Yordam</Link>
          <Link to="/">Xato topdingizmi?</Link>
        </div>
        <div className="footer">
          <Link to="/">
            <img src={BlackWhiteLogo} alt="" />
          </Link>
          <p>
            OOO “SUPER-MIYA” Toshkent shahri, Yunusobod tumani, Buyuk Turon MFY,
            Ц-2, 24A uy. H/R 2020 8000 5055 5783 4001 “KDB BANK UZBEKISTAN” MFO:
            01065 INN: 309769049
          </p>
        </div>
      </div>
    </>
  )
}
export default HomePage
