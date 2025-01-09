import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../../configuration/environment'
import { ProductInt } from '../../../types'
import { Button, PostProductForm, Product } from '../../../Components'

export default function EventsRequestPage() {
  const queryClient = useQueryClient()
  const { data, error, isLoading } = useQuery<{
    products: ProductInt[] | undefined
    productsTotal: number
  }>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${environment.localURL}`, { method: 'GET' })

      if (response.ok) {
        return response.json()
      }
    },
  })
  const deleteProductMutation = useMutation({
    mutationKey: ['product'],
    mutationFn: async (id: string | number) => {
      try {
        const response = await fetch(`${environment.localURL}/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          const data = await response.json()

          alert(data.message)
        }
      } catch (err) {
        alert(err)
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
  return (
    <>
      <h2>Node Express - Intro</h2>

      <PostProductForm />

      {data?.productsTotal === 0 && <h3>No products</h3>}
      {(isLoading && <h3>Loading wait</h3>) || (error && <h3>Ops, something happened</h3>)}
      {data?.products && (
        <>
          <h4>
            Products total: <mark>{data.productsTotal}</mark>
          </h4>
          {data.products.map((product: ProductInt) => (
            <Product tagElement={'section'} product={product} key={product.id}>
              <Button
                className="btn btn-remove"
                OnClick={() => deleteProductMutation.mutate(`${product.id}`)}
                rest={{ type: 'button' }}
              >
                Delete
              </Button>
              <hr />
            </Product>
          ))}
        </>
      )}
    </>
  )
}
