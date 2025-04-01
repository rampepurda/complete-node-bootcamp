import { Button, ProductOrdered } from '../../Components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CartInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../rtk-toolkit/hooks'
import { StatusT } from '../../rtk-toolkit/slices/cartSlice'

export function CartPage() {
  const { t } = useTranslation()
  const { productInCart, status } = useAppSelector(
    (state: { cart: { productInCart: CartInt; status: StatusT } }) => state.cart
  )
  const queryClient = useQueryClient()
  const deleteProductCartMutation = useMutation({
    mutationKey: ['productCart'],
    mutationFn: async (id: string | number) => {
      try {
        const response = await fetch(`${environment.localProductsCartURL}/${id}`, {
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
          Cart - total Items: <mark>{productInCart?.productsOrderTotal}</mark>
        </h2>

        {status.error && <h3>Loading, wait</h3>}
        {productInCart?.productsOrdered?.map((cart: any) => (
          <>
            {status.isLoading && <h3>Loading, wait</h3>}
            <ProductOrdered
              tagElement={'section'}
              product={cart}
              detailURL={'/cnb/section6/api_routes_methods'}
              key={cart.id}
            >
              <Button
                classesName={'btn-remove'}
                OnClick={() => deleteProductCartMutation.mutate(cart.id)}
                title={t('form.delete')}
                rest={{ type: 'button' }}
              />
            </ProductOrdered>
          </>
        ))}
      </section>
    </>
  )
}
