import { useMutation, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'

export const PostProductForm = () => {
  const queryClient = useQueryClient()
  const productMutation = useMutation({
    mutationKey: ['product'],
    mutationFn: async (dataForm: Record<string, any>) => {
      try {
        const response = await fetch(`${environment.localProductsURL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataForm),
        })

        if (response.ok) {
          alert('Successful posted')
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
