import { ProductPreview } from "./ProductPreview"

export const ProductList = ({ productsNames,setProduct }) => {
  return (
    <section className='product-list'>
      {productsNames.map((pName) => (
        <ProductPreview setProduct={setProduct} pName={pName}/>
      ))}
    </section>
  )
}
