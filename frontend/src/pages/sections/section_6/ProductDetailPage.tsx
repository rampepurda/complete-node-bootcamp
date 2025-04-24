import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { environment } from '../../../configuration/environment'
import { Product } from '../../../Components'
import { ProductInt } from '../../../types'

export const ProductDetailPage = () => {
  const params = useParams()
  const title = params.productName
  const { data, isLoading } = useQuery({
    queryKey: [`product${title}`],
    queryFn: async (): Promise<{ product: ProductInt } | undefined> => {
      const response = await fetch(`${environment.localProductsURL}/${title}`, { method: 'GET' })

      if (response.ok) {
        return response.json()
      }
    },
  })

  return (
    <>
      {isLoading ? (
        <h3>Loading, wait</h3>
      ) : (
        <>
          <h2>Product detail</h2>

          <Product tagElement={'div'} product={data?.product} isDetail={true}>
            <Link to="/cnb/section6/api_routes_methods">Back to index</Link>
          </Product>
        </>
      )}
    </>
  )
}
