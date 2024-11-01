import React from 'react'
import { Link } from 'react-router-dom'
import fs from 'fs'

export default function ReadingWritingFilePageSec2() {
  return (
    <>
      <h2>Section 2: Reading and Writing Files</h2>
      <h4>
        Node Module: <em>File System (FS)</em>
      </h4>
      <p>
        const fs = <strong>require('fs')</strong>
      </p>
      <mark>fs.readFileSync</mark>
      <mark>fs.writeFileSync</mark>

      <div className="hasTypeDisc hasOutline">
        <ul>
          <li>const fs = require('fs');</li>
          <li>
            const <em>textIn</em> = <strong>fs.readFileSync</strong>('./final/txt/input.txt',
            'utf-8')
          </li>
          <li>
            const <em>textOut</em> = `That is all what we know about avocado: $&#123;<em>textIn</em>
            &#125;`
          </li>
          <li>
            <strong>fs.writeFileSync</strong>('./final/txt/output.txt', <em>textOut</em>)
          </li>
        </ul>
      </div>
    </>
  )
}
