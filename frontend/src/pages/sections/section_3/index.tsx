import React, { useActionState } from 'react'
import { environment } from '../../../configuration/environment'

export async function postProduct(prevState: unknown, formData: FormData) {
  const postsData = {
    productName: formData.get('productName'),
    from: formData.get('from'),
    description: formData.get('description'),
  }

  try {
    const response = await fetch(`${environment.localProductsURL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postsData),
    })

    if (response.ok) {
      const data = await response.json()

      alert(data.message)
    } else {
      alert('Ops')
    }
  } catch (err) {
    alert(err)
  }
}

export default function IntroBackendDevPage() {
  const [state, formAction, isPending] = useActionState(postProduct, null)

  return (
    <>
      <div className="hasOutline">
        <h3>This part will be removed</h3>
        <form className="width-is-5" name="products" method="post" action={formAction}>
          <input id="product" type="text" name="productName" placeholder="product" required />
          <input id="from" type="text" name="from" placeholder="from" required />
          <input
            id="description"
            type="text"
            name="description"
            placeholder="description"
            required
          />

          <button className="btn btn-submit" type="submit" disabled={isPending}>
            {isPending ? 'Submitting' : 'Submit'}
          </button>
        </form>
      </div>

      <h2>Section 3: Introduction to Backend Web Development</h2>

      <h3>Static vs Dynamic vs Api</h3>
      <ul className="hasTypeDisc hasVerticalPadding-3">
        <li>
          <h4>Static:</h4>
          <ul className="hasTypeDisc hasVerticalPadding-3">
            <li>No changes on the Server</li>
            <li>Static HTML, JS, CSS, Images...etc</li>
          </ul>
        </li>
        <li>
          <h4>
            Dynamic: <mark>ServerSideRendering</mark>
          </h4>
          <ul className="hasTypeDisc hasVerticalPadding-3">
            <li>Build on the Server, change content</li>
            <li>Usually contains: Database(MongoDB), JSON(writeFile, readFile), Login...etc.</li>
            <li>JSON file: writeFile, readFile)</li>
            <li>Login, Submit...etc.</li>
          </ul>
        </li>
        <li>
          <h4>
            API: <mark>ClientSideRendering</mark>{' '}
          </h4>
          ApplicationProgrammingInterface
          <ul className="hasTypeDisc hasVerticalPadding-3">
            <li>Only data are send to the client</li>
            <li>React, Angular, Vue</li>
            <li>Usually contains: Database(MongoDB), JSON(writeFile, readFile), Login...etc.</li>
          </ul>
        </li>
      </ul>
    </>
  )
}
