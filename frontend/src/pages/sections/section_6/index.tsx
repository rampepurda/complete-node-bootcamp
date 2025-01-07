import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { environment } from '../../../configuration/environment'
import { ProductInt } from '../../../types'
import { PostProductForm, Product } from '../../../Components'

export default function IntroPage() {
  const { data, error, isLoading } = useQuery<{ products: ProductInt[] | undefined }>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${environment.localURL}`, { method: 'GET' })

      if (response.ok) {
        return response.json()
      }
    },
  })

  return (
    <>
      <h2>Node Express - Intro</h2>

      <h3>Postman</h3>
      <ul className="hasTypeDisc hasVerticalPadding-3">
        <li>Postman is an API platform for building and using APIs.</li>
        <li>
          Postman simplifies each step of the API lifecycle and streamlines collaboration so you can
          create better APIs—faster.
        </li>
        <li>
          Be careful during testing 'POST' to simulate real form data via body/row, you can lost
          your real json data on API Server.
        </li>
        <li>
          <Link to="https://www.postman.com/downloads/" rel="external" target="_blank">
            Download here
          </Link>
        </li>
      </ul>

      <h3>Express i/add</h3>
      <ul className="hasTypeDisc hasVerticalPadding-3">
        <li>npm i express | yarn add express</li>
      </ul>

      <PostProductForm />
      {(isLoading && <h3>Loading wait</h3>) || (error && <h3>Ops, something happened</h3>)}
      {data?.products &&
        data.products.map((product: ProductInt) => (
          <Product tagElement={'section'} product={product} key={product.id} />
        ))}
    </>
  )
}
