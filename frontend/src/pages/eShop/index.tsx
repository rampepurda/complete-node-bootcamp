import { Button, Product } from '../../Components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'

export function EShopPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { data, isLoading } = useQuery({
    queryKey: ['productsOrdered'],
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
        const response = await fetch(`${environment.localProductsCartURL}/${args.id}`, {
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
              OnClick={() => {
                mutate({ id: product.id, formData: product })
                dispatch(fetchCart())
              }}
              title={t('eShop.addToCart')}
              rest={{ type: 'button' }}
            />
          </Product>
        ))}
      </div>
    </section>
  )
}
