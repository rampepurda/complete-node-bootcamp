export default function TempProductsPage() {
  return (
    <>
      <h2>Section 2: Templating & Creating Own Modules</h2>
      <div>
        <mark>replace</mark>
        <mark>require</mark>
        <mark>headerWrite</mark>
      </div>

      <ul className="hasTypeDisc hasVerticalPadding-4">
        <li>
          <label>Node Module:</label>
          <h4>
            <em>"http" | "url"</em>
          </h4>
          <code>
            const http = <strong>require('http')</strong>
            <br />
            const url = <strong>require('url')</strong>
          </code>
        </li>
        <li>
          See for structure here: <strong>backend/api.js</strong>
        </li>
      </ul>

      <h2>Creating Own Modules</h2>
      <mark>module.exports</mark>

      <ul>
        <li>
          <strong>module.exports</strong> = (temp, product) =&gt; &#123;
        </li>
        <li>&nbsp;let output = temp.replace(/replName/g, product.productNamePath);</li>
        <li>&nbsp;return output;</li>
        <li>&#125;</li>
      </ul>

      <h2>Import:</h2>
      <ul>
        <li>
          const replaceTemplate = <strong>require</strong>('./moduleName.js')
        </li>
      </ul>
    </>
  )
}
