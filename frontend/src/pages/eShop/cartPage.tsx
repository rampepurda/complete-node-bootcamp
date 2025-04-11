import classes from './Components/eShop.module.scss'
import { Button, ProductOrdered } from '../../Components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import { CartInt } from '../../types'
import React from 'react'
import { fetcher } from '../../utils/fetcher'
import { OrderBox } from './Components/OrderBox'
import { useAppDispatch } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export function CartPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useQuery({
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

          dispatch(fetchCart())
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

  return (
    <>
      <title>{t('cart.headline')}</title>
      <meta name="keywords" content="book, shop, eshop" />

      <div className={classes.cart}>
        {data?.productsOrderTotal === 0 ? (
          <h2>{t('cart.cartStatus')}</h2>
        ) : (
          <>
            {(isLoading && <h3>...loading, wait</h3>) || (error && <h3>Ops, error</h3>)}
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

            <section className={classNames(classes.orderBox, 'hasOutline')}>
              <h2>
                {t('cart.priceTotal')}{' '}
                <span className={classes.priceBox}>{data?.priceTotal} GBP</span>
              </h2>
              <Button classesName={'btn-submit'} rest={{ type: 'button' }}>
                <Link to="/eShop/cart/order">{t('cart.order')}</Link>
              </Button>
            </section>
          </>
        )}
      </div>
    </>
  )
}
