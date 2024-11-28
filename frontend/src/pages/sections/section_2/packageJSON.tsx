export default function PackageJSONPage() {
  return (
    <>
      <h2>Section 2: package.json</h2>
      <div>
        <mark>init</mark>
      </div>

      <div className="hasOutline">
        <h4>NPM vs Yarn:</h4>
        <p>
          The Difference Yarn is installing the packages simultaneously, and that is why Yarn is
          faster than NPM. They both download packages from npm repository. Yarn generates yarn.
          lock to lock down the versions of package's dependencies by default.
        </p>
      </div>

      <h4>Create and setup package.json</h4>
      <ul className="hasVerticalPadding-3 hasTypeDecimal">
        <li>
          <label>run:</label>
          <strong>npm init</strong>
        </li>
        <li>
          <label>set:</label>
          <strong>accordingly instruction</strong>
        </li>
        <li>
          <label>dependencies:</label>
          <strong>npm i slugify</strong> <span className="color-is-gray">(like Webpack)</span>
        </li>
        <li>
          <label>devDependencies:</label>
          <strong>npm i nodemon --save-dev</strong>{' '}
          <span className="color-is-gray">
            (dev: devDependencies. After changes are done automatically restart the server)
          </span>
        </li>
        <li>
          <label>package.json/scripts:</label>
          <strong> "start": "nodemon api.js"</strong>
        </li>
        <li>
          <label>run server:</label>
          <strong>npm start</strong>
        </li>
      </ul>
    </>
  )
}
