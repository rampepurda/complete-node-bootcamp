import React, { FormEvent } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { environment } from '../../configuration/environment'

export const PostProductForm = () => {
  const queryClient = useQueryClient()
  const productMutation = useMutation({
    mutationKey: ['product'],
    mutationFn: async (dataForm: Record<string, any>) => {
      try {
        const response = await fetch(`${environment.localURL}`, {
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data)

    productMutation.mutate(formData)
    event.currentTarget.reset()
  }

  return (
    <form className="width-is-5" name="products" method="post" onSubmit={handleSubmit}>
      <input id="product" type="text" name="productName" placeholder="product" required />
      <input id="from" type="text" name="from" placeholder="from" required />
      <input id="description" type="text" name="description" placeholder="description" required />
      <button className="btn btn-submit" type="submit" disabled={productMutation.isPending}>
        {productMutation.isPending ? 'Submitting' : 'Submit'}
      </button>
    </form>
  )
}