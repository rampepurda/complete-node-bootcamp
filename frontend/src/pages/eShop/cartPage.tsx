import { Button, ProductOrdered } from '../../Components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CartInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'

export function CartPage() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  // Will be called from RTK Thunk
  const cartQuery = useQuery({
    queryKey: ['orderedProducts'],
    queryFn: async (): Promise<CartInt | undefined> => {
      try {
        return await fetch(`${environment.localProductsOrderedURL}`, { method: 'GET' }).then(
          (response) => response.json()
        )
        // If Any Products, response message
      } catch (err) {
        alert(err)
      }
    },
  })
  const deleteProductCartMutation = useMutation({
    mutationKey: ['productCart'],
    mutationFn: async (id: string | number) => {
      try {
        const response = await fetch(`${environment.localProductsOrderedURL}/${id}`, {
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
      <title>eShop-Cart</title>
      <meta name="keywords" content="book, shop, eshop" />

      <section style={{ margin: '1rem 5rem' }}>
        <h2>
          Cart - total Items: <mark>{cartQuery?.data?.productsOrderTotal}</mark>
        </h2>

        {cartQuery.data && (
          <>
            <p>{cartQuery.data.productsOrderTotal}</p>
            {cartQuery.data.productsOrdered?.map((order: any) => (
              <ProductOrdered
                tagElement={'section'}
                product={order}
                detailURL={'/cnb/section6/api_routes_methods'}
                key={order.id}
              >
                <Button
                  classesName={'btn-remove'}
                  OnClick={() => deleteProductCartMutation.mutate(order.id)}
                  title={t('form.delete')}
                  rest={{ type: 'button' }}
                />
              </ProductOrdered>
            ))}
          </>
        )}
      </section>
    </>
  )
}
