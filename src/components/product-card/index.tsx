interface IProduct {
  img: any
  title: string
  cost: string
  classname?: string
}
const ProductCard = ({ img, classname, title, cost }: IProduct) => {
  return (
    <>
      <div className="product-card">
        <div className="image">
          <img src={img} alt="" />
        </div>
        <h2>{title}</h2>
        <span>{cost} so'm</span>
      </div>
    </>
  )
}

export default ProductCard
