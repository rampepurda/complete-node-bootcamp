import React, { useEffect } from 'react'
import { Button, Product, SelectedSort } from '../../Components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProductInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../rtk-toolkit/hooks'
import { fetchCart } from '../../rtk-toolkit/slices/cartSlice'
import { useSearchParams } from 'react-router'
import { optionsEshop } from '../../__mock__/mock_data'

export function EShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramSort: string | null = searchParams.get('sort')
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['productsOrdered'],
    queryFn: async ({
      signal,
    }): Promise<
      | {
          products: ProductInt[] | undefined
          message: string
        }
      | undefined
    > => {
      const response = await fetch(`${environment.localProductsURL}?sort=${paramSort}`, {
        method: 'GET',
        signal: signal,
      })

      if (paramSort) {
        try {
          return response.json()
        } catch (err) {
          alert(err)
        }
      } else {
        try {
          setSearchParams((prev) => {
            return prev
          })
          return response.json()
        } catch (err) {
          alert(err)
        }
      }
    },
    enabled: paramSort === null || true,
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

      {(isLoading && <h3>...loading, wait</h3>) || (error && <h3>Ops, something happened</h3>)}
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
