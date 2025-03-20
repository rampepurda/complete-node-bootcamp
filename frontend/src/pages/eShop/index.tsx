import { Button, Header, CartSwitcher, Product } from '../../Components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import React from 'react'

export default function EShopPage() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<
      | {
          products: ProductInt[] | undefined
          message: string
          productsTotal: number
        }
      | undefined
    > => {
      try {
        return await fetch(`${environment.localProductsURL}`, { method: 'GET' }).then((response) =>
          response.json()
        )
      } catch (err: any) {
        alert(err)
      }
    },
  })
  const { mutate } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async (args: { id: string | number; formData: Record<string, any> }) => {
      try {
        const response = await fetch(`${environment.localProductsOrderedURL}/${args.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args.formData),
        })

        if (response.ok) {
          const data = await response.json()

          alert(data.message)
        }
      } catch (err) {
        alert(err)
      }
    },
  })

  return (
    <>
      <>
        <title>eShop-Welcome</title>
        <meta name="author" content="michal" />
        <meta name="keywords" content="book, shop, eshop" />
      </>

      <Header title={'eShop - Welcome'}>
        <CartSwitcher />
      </Header>

      <section style={{ margin: '1rem 5rem' }}>
        <div>
          {isLoading && <h3>...loading, wait</h3>}
          {data?.products?.map((product: ProductInt) => (
            <Product
              classes={'hasOutline'}
              tagElement={'section'}
              product={product}
              key={product.id}
              isDetail={true}
            >
              <Button
                classesName={'btn-edit'}
                OnClick={() => mutate({ id: product.id, formData: product })}
                title={t('eShop.addToCart')}
                rest={{ type: 'button' }}
              />
            </Product>
          ))}
        </div>
      </section>
    </>
  )
}
