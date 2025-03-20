import { Button, ProductOrdered } from '../../Components'
import { useQuery } from '@tanstack/react-query'
import { CartInt } from '../../types'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'

export function CartPage() {
  const { t } = useTranslation()
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

  return (
    <>
      <>
        <title>eShop-Cart</title>
        <meta name="keywords" content="book, shop, eshop" />
      </>

      <section style={{ margin: '1rem 5rem' }}>
        {cartQuery.data && (
          <>
            <p>{cartQuery.data.productsOrderTotal}</p>
            {cartQuery.data.productsOrdered?.map((order: any) => (
              <ProductOrdered tagElement={'section'} product={order}>
                <Button
                  classesName={'btn-remove'}
                  //OnClick={() => mutate({ id: product.id, formData: product })}
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
