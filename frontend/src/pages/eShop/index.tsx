import React from 'react'
import { Button, Product, SelectedSort } from '../../Components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'
import { fetcher } from '../../utils/fetcher'
import { useSearchParams } from 'react-router'
import { optionsEshop } from '../../__mock__/mock_data'

export function EShopPage() {
  const [searchParams] = useSearchParams()
  const querySort: string | null = searchParams.get('sort')
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
    > =>
      await fetcher(`${environment.localProductsURL}?sort=${querySort}`, {
        method: 'GET',
      }),
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

          dispatch(fetchCart())
          alert(data.message)
        }
      } catch (err) {
        alert(err)
      }
    },
  })

  return (
    <section style={{ margin: '1rem 5rem' }}>
      <SelectedSort options={optionsEshop} name={'sort'} btnClass={'btn-primary'} />

      {isLoading && <h3>...loading, wait</h3>}
      <div className="display-grid display-grid-temp-columns-three">
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
