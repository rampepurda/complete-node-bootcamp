import { Button, ProductOrdered } from '../../Components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import { CartInt, ProductInt } from '../../types'
import React from 'react'

export function CartPage() {
  const { t } = useTranslation()
  //const { cart, status } = useAppSelector((state) => state.cartSlice)
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
    mutationFn: async (id: string | number) => {
      try {
        const response = await fetch(`${environment.localProductsCartURL}/${id}`, {
          method: 'PATCH',
        })

        if (response.ok) {
          alert(t('eShop.incItemInCart'))
        }
      } catch (err) {
        alert(err)
      }
    },
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
          Items total:
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
            <div className="display-flex-start like-box" style={{ fontSize: '1.2rem' }}>
              <strong>Ordered pieces:</strong> &nbsp;
              <span style={{ backgroundColor: '#fff', borderRadius: '1rem' }}>{cart?.piece}</span> |
              &nbsp;
              <strong>Price Total:</strong>
              &nbsp;
              <strong>{cart.priceTotal}</strong>
              &nbsp;GBP |
              <Button
                classesName={'btn-link-has-ico'}
                OnClick={() => incOrderMutation.mutate(cart.id)}
                rest={{ type: 'submit', disabled: cart?.piece && cart.piece === 6 }}
              >
                <strong
                  className="color-is-green"
                  aria-label="increaseorder"
                  style={{ fontSize: '1.7rem', textShadow: '1px 1px 2px #FFF' }}
                >
                  +
                </strong>
              </Button>{' '}
              |
              <Button
                classesName={'btn-link-has-ico'}
                OnClick={() => incOrderMutation.mutate(cart.id)}
                rest={{ type: 'submit', disabled: cart?.piece && cart.piece === 6 }}
              >
                <strong
                  className="color-is-red"
                  aria-label="increaseorder"
                  style={{ fontSize: '2rem', textShadow: '1px 1px 2px #FFF' }}
                >
                  -
                </strong>
              </Button>
              {cart?.piece && cart.piece === 6 && (
                <p className="color-is-red">
                  You can order <strong>only 6 items per product</strong>
                </p>
              )}
            </div>
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
          <Button classesName={'btn-info'} title={t('eShop.order')} rest={{ type: 'button' }} />
        </section>
      </div>
    </>
  )
}
