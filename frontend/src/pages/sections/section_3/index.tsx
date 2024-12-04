import React from 'react'

export default function IntroBackendDevPage() {
  return (
    <>
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
