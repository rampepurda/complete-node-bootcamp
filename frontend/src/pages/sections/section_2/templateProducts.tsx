import { Product } from '../../../Components'
import { ProductInt } from '../../../types'
import { dataMock } from '../../../__mock__/mock_data'

const products: ProductInt[] = dataMock.products
export default function TemplateProductsPageSec2() {
  return (
    <>
      <h2>Section 2: Creating Products Template</h2>
      {products.map((product) => {
        return <Product key={product.id} product={product} />
      })}
    </>
  )
}
