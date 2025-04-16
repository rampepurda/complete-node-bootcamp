import classes from './Components/eShop.module.scss'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../rtk-toolkit/hooks'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FormPostOrder } from '../../Components'
import { environment } from '../../configuration/environment'
import { fetchCart, InitValuesT } from '../../rtk-toolkit/slices/cartSlice'
import { FormOrderErrorT, NavTypeE } from '../../types'
import { schema } from '../../ZOD-schema/zodSchema'
import { useState } from 'react'

export function OrderPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { cart, status } = useAppSelector((state: { cartSlice: InitValuesT }) => state.cartSlice)
  const [error, setError] = useState<FormOrderErrorT | undefined>({
    fullName: '',
    email: '',
    phone: '',
    payment: '',
  })
  const actionSubmit = async (formData: FormData) => {
    const dataOrder = {
      client: {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        payment: formData.get('payment'),
      },
      ordered: {
        productsOrdered: cart?.productsOrdered,
        priceTotal: cart?.priceTotal,
      },
    }
    const formValidation = schema.OrderPost.safeParse(dataOrder.client)

    if (formValidation.success) {
      try {
        const response = await fetch(`${environment.localProductsOrderURL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataOrder),
        })

        if (response.ok) {
          const data = await response.json()

          alert(data.message)
          dispatch(fetchCart())
        } else {
          alert('Ops')
        }

        if (error) {
          setError({ fullName: '', payment: '', email: '', phone: '' })
        }
      } catch (err) {
        alert(err)
      }
    } else {
      setError({
        fullName: `${formValidation.error.flatten().fieldErrors.fullName}`,
        email: `${formValidation.error.flatten().fieldErrors.email}`,
        phone: `${formValidation.error.flatten().fieldErrors.phone}`,
        payment: `${formValidation.error.flatten().fieldErrors.payment}`,
      })
    }
  }

  return (
    <>
      <title>{t('eShop.cartOrder.headline')}</title>
      <meta name="keywords" content="book, shop, eshop" />

      <div className={classes.cart}>
        {cart?.priceTotal === 0 ? (
          <>
            <h2>{t('eShop.cartOrder.orderedSuccessfully')}</h2>
            <Link to="/eShop">{t('eShop.backToEshop')}</Link>
          </>
        ) : (
          <>
            <nav aria-label={NavTypeE.breadCrumb}>
              <ul className={classNames('isHorizontal', classes.breadCrumb)}>
                <li>
                  <Link to="/eShop">eShop</Link> /
                </li>
                <li>
                  <Link to="/eShop/cart">{t('eShop.cartOrder.breadcrumb.cart')}</Link> /
                </li>
                <li aria-current="page">
                  <strong className="color-is-darkmagenta">
                    {t('eShop.cartOrder.breadcrumb.order')}
                  </strong>
                </li>
              </ul>
            </nav>

            <section className="hasOutline">
              <h2>{t('eShop.cartOrder.resume')}:</h2>
              <ul className="hasTypeDecimal">
                {cart?.productsOrdered?.map((cart) => (
                  <li key={cart.id}>
                    <strong>{cart.productName}</strong> | {t('eShop.cart.orderedTotal')}:{' '}
                    <strong>{cart.piece}</strong> | {t('eShop.cart.priceTotal')}:{' '}
                    <strong>{cart.priceTotal}</strong>&nbsp; GBP
                  </li>
                ))}
              </ul>

              <hr />
              <h2>
                {t('eShop.cartOrder.paymentTotal')}:
                <strong className="color-is-darkmagenta"> {cart?.priceTotal}</strong>
                &nbsp;GBP
              </h2>
            </section>

            <section className="hasOutline">
              <h3>{t('eShop.cartOrder.form.headline')}:</h3>
              <h3>{error && error.fullName !== 'undefined' && error.fullName}</h3>

              <FormPostOrder
                onSubmit={actionSubmit}
                status={status.isLoading}
                error={{
                  fullName: `${error?.fullName}`,
                  email: `${error?.email}`,
                  phone: `${error?.phone}`,
                  payment: `${error?.payment}`,
                }}
              />
            </section>
          </>
        )}
      </div>
    </>
  )
}
