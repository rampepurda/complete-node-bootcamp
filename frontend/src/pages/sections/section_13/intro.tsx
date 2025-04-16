import { Link } from 'react-router-dom'

export default function SetGitPage() {
  return (
    <>
      <h2>Section 13: Setting Up Git and Deployment(Heroku)</h2>
      <Link
        className="link-ico-external"
        to="https://www.heroku.com/"
        target="_blank"
        rel="external"
      >
        Visit Heroku&nbsp;
        <img src="/ico-internal.svg" width={24} height={24} aria-hidden={true} />
      </Link>

      <ul className="hasTypeDisc hasVerticalPadding-5">
        <li>
          Install Heroku
          <h5>
            <em>(Heroku is payment service. Only base level is for free)</em>
          </h5>
        </li>
        <li>Go to Heroku web - Create Account</li>
        <li>
          <strong>Terminal:</strong> heroku login
        </li>
        <li>
          <strong>package.json</strong> update:
          <ul>
            <li>"script": &#123;</li>
            <li>
              &nbsp;<strong>"start"</strong>: "node serve.js",
            </li>
            <li>
              &nbsp;<strong>"dev"</strong>: "nodemon server"
            </li>
            <li>&#125;</li>
            <li>
              <strong>"engine":</strong> &#123;
            </li>
            <li>&nbsp;"node": "&gt;= 10.0.0"</li>
            <li>&#125;</li>
          </ul>
        </li>
        <li></li>
      </ul>
    </>
  )
}
