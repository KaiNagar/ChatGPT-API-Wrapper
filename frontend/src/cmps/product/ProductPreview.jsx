export const ProductPreview = ({ pName,setProduct }) => {
  return (
    <section onClick={()=>setProduct(pName)} className={`product-preview ${pName}`}>
      <h1>{pName}</h1>
    </section>
  )
}
