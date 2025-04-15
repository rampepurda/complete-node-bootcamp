import React, { useActionState } from 'react'
import { environment } from '../../configuration/environment'
import { Link } from 'react-router-dom'

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

export default function R19useActionState() {
  const [state, formAction, isPending] = useActionState(postProduct, null)
  const styles = {
    mPage: {
      margin: '2rem 10%',
    },
  }

  return (
    <div className="hasOutline" style={styles.mPage}>
      <Link to="/">Back</Link>
      <h2>React19: useActionState</h2>
      <p>This part will be removed and moved in to the ReactGuide after updating to version19</p>
      <form className="width-is-5" name="products" method="post" action={formAction}>
        <input id="product" type="text" name="productName" placeholder="product" required />
        <input id="from" type="text" name="from" placeholder="from" required />
        <input id="description" type="text" name="description" placeholder="description" required />

        <button className="btn btn-submit" type="submit" disabled={isPending}>
          {isPending ? 'Submitting' : 'Submit'}
        </button>
      </form>
      <hr />

      <ul className="hasVerticalPadding-3">
        <li>
          <h4>set Fn:</h4>
        </li>
        <li>
          async function&nbsp;
          <strong>
            <em className="color-is-darkmagenta">postProduct</em>(prevState: unknown, formData:
            FormData)
          </strong>
          &#123;
        </li>
        <li>&nbsp;const postsData = &#123;</li>
        <li>&nbsp;productName: formData.get('productName'),...</li>
        <li>&nbsp;try &#123;&#125; catch...;&#125;</li>
        <li>
          <h4>useActionState:</h4>
        </li>
        <li>
          <code>
            const [
            <strong>
              state, <span className="color-is-darkmagenta">formAction</span>, isPending
            </strong>
            ] = <strong>useActionState</strong>(
            <strong>
              <em className="color-is-darkmagenta">postProduct</em>
            </strong>
            , null)
          </code>
          <ul className="hasTypeDisc">
            <li>
              <strong>state:</strong> Previous or actual values if have. If not null
            </li>
            <li>
              <strong>formAction:</strong> Mandatory(do not change the name)
            </li>
            <li>
              <strong>isPending:</strong> status
            </li>
          </ul>
        </li>
        <li>
          <h4>form Action:</h4>
          <code>
            &lt;form method="post" action=&#123;
            <strong className="color-is-darkmagenta">formAction</strong>&#125;&gt;
          </code>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}
