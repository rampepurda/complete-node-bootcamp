import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { environment } from '../../../configuration/environment'
import { ProductInt } from '../../../types'
import { Product } from '../../../Components'

export default function IntroPage() {
  const { data, error, isLoading } = useQuery<{ products: ProductInt[] | undefined }>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${environment.localURL}`, { method: 'get' })

      if (response.ok) {
        return response.json()
      }
    },
  })

  return (
    <>
      <h2>Node Express - Intro</h2>

      <ul className="hasTypeDisc hasVerticalPadding-3">
        <li>
          <h4>Postman</h4>
          Postman is an API platform for building and using APIs.
          <br />
          Postman simplifies each step of the API lifecycle and streamlines collaboration so you can
          create better APIs—faster.
          <br />
          <Link to="https://www.postman.com/downloads/" rel="external" target="_blank">
            Download here
          </Link>
        </li>
        <li>
          <h4>Express i/add</h4>
          npm i express | yarn add express
        </li>
      </ul>

      {(isLoading && <h3>Loading wait</h3>) || (error && <h3>Ops, something happened</h3>)}
      {data?.products &&
        data.products.map((product: ProductInt) => (
          <Product tagAttr={'div'} product={product} key={product.id} />
        ))}
    </>
  )
}
