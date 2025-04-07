import { Button, ProductOrdered } from '../../Components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import { CartInt } from '../../types'
import React from 'react'
import { fetcher } from '../../actions/fetcher'
import { OrderBox } from './Components/OrderBox'

export function CartPage() {
  const { t } = useTranslation()
  const { data, isLoading, isPending } = useQuery({
    queryKey: ['productsInCart'],
    queryFn: async (): Promise<CartInt | undefined> => {
      try {
        return await fetch(`${environment.localProductsCartURL}`, { method: 'GET' }).then(
          (response) => response.json()
        )
      } catch (err: any) {
        alert(err)
      }
    },
  })
  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation({
    mutationKey: ['productDelete'],
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
      return await queryClient.invalidateQueries({ queryKey: ['productsInCart'] })
    },
  })
  const incOrderMutation = useMutation({
    mutationKey: ['incOrder'],
    mutationFn: async (id: string | number) =>
      await fetcher(`${environment.localProductsCartURL}/incr/${id}`, {
        method: 'PATCH',
      }),
    onSuccess: () => alert(t('eShop.incItemInCart')),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['productsInCart'] })
    },
  })
  const decOrderMutation = useMutation({
    mutationKey: ['decOrder'],
    mutationFn: async (id: string | number) =>
      await fetcher(`${environment.localProductsCartURL}/decr/${id}`, {
        method: 'PATCH',
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['productsInCart'] })
    },
  })
  const styles = {
    bgColor: { backgroundColor: '#fcf7f7' },
  }

  return (
    <>
      <title>{t('eShop.cartTitle')}</title>
      <meta name="keywords" content="book, shop, eshop" />

      <div style={{ margin: '1rem 5rem' }}>
        <h2>
          Total:&nbsp;
          <strong>{data?.productsOrderTotal}</strong>
        </h2>

        {data?.productsOrdered?.map((cart) => (
          <ProductOrdered
            classes={'hasOutline'}
            tagElement={'section'}
            product={cart}
            detailURL={'/cnb/section6/api_routes_methods'}
            key={cart.id}
          >
            <OrderBox
              piece={cart.piece}
              priceTotal={cart.priceTotal}
              incHandler={() => incOrderMutation.mutate(cart.id)}
              decHandler={() => decOrderMutation.mutate(cart.id)}
            />

            <div>
              <Button
                classesName={'btn-remove'}
                OnClick={() => deleteProductMutation.mutate(cart.id)}
                title={t('form.delete')}
                rest={{ type: 'button' }}
              />
            </div>
          </ProductOrdered>
        ))}

        <section className="hasOutline" style={styles.bgColor}>
          <h2>
            {t('eShop.priceTotal')}: {data?.priceTotal} GBP
          </h2>
          <Button classesName={'btn-submit'} title={t('eShop.order')} rest={{ type: 'button' }} />
        </section>
      </div>
    </>
  )
}
