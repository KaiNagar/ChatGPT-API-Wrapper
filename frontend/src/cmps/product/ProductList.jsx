import { ProductPreview } from "./ProductPreview"

export const ProductList = ({ productsNames,setProduct }) => {
  return (
    <section className='product-list'>
      {productsNames.map((pName) => (
        <ProductPreview key={pName} setProduct={setProduct} pName={pName}/>
      ))}
    </section>
  )
}
