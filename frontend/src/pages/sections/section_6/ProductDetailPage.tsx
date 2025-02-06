import { Link, useParams } from 'react-router-dom'
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
      const response = await fetch(`${environment.localURL}/${title}`, { method: 'GET' })

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
            <Link to="/section6/node_routers">Back to index</Link>
          </Product>
        </>
      )}
    </>
  )
}
