import { useMutation, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'
import { useTranslation } from 'react-i18next'

export const FormPostProduct = () => {
  const queryClient = useQueryClient()
  const productMutation = useMutation({
    mutationKey: ['product'],
    mutationFn: async (dataForm: Record<string, any> | undefined) => {
      try {
        const response = await fetch(`${environment.localProductsURL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataForm),
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
  const handleActionSubmit = async (formData: FormData) => {
    const postsData = {
      productName: formData.get('productName'),
      from: formData.get('from'),
      description: formData.get('description'),
    }

    productMutation.mutate(postsData)
  }

  return (
    <form className="width-is-5" name="products" method="post" action={handleActionSubmit}>
      <input id="product" type="text" name="productName" placeholder="product" required />
      <input id="from" type="text" name="from" placeholder="from" required />
      <input id="description" type="text" name="description" placeholder="description" required />

      <button className="btn btn-submit" type="submit" disabled={productMutation.isPending}>
        {productMutation.isPending ? 'Submitting' : 'Submit'}
      </button>
    </form>
  )
}

export const FormPostOrder = ({ onSubmit, status }: { onSubmit: any; status: boolean }) => {
  const { t } = useTranslation()

  return (
    <form className="width-is-5" method="post" action={onSubmit}>
      <label htmlFor="fullName">
        {t('eShop.cartOrder.form.fullName')}:<span className="color-is-red">*</span>
      </label>
      <input
        id="fullName"
        type="text"
        name="fullName"
        required
        autoFocus={true}
        aria-required={true}
      />

      <label htmlFor="email">
        Email:<span className="color-is-red">*</span>
      </label>
      <input id="email" type="email" name="email" placeholder="@" aria-required={true} />

      <label htmlFor="phone">
        {t('eShop.cartOrder.form.phone')}:<span className="color-is-red">*</span>
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="111222333"
        pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
        aria-required={true}
      />

      <div>
        <h5>
          {t('eShop.cartOrder.form.payment')}:<span className="color-is-red">*</span>
        </h5>
        <label role="button" tabIndex={0}>
          <input
            className="width-is-1"
            type="radio"
            value="card"
            name="payment"
            defaultChecked={false}
            aria-checked={false}
          />
          {t('eShop.cartOrder.form.byCard')}
        </label>
        <label tabIndex={0}>
          <input
            className="width-is-1"
            type="radio"
            value="cash"
            name="payment"
            defaultChecked={false}
            aria-checked={false}
          />
          {t('eShop.cartOrder.form.byCash')}
        </label>
      </div>

      <button className="btn btn-info" type="submit">
        {status ? 'Submitting' : t('eShop.cartOrder.form.submit')}
      </button>
    </form>
  )
}
