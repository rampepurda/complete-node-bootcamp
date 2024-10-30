import { Link, Outlet } from 'react-router-dom'
import React from 'react'
import { Header } from '../Components'

export default function RootLayout() {
  return (
    <>
      <Header />

      <main>
        <div>
          <Link to="https://nodejs.org/docs/latest/api/" rel="external" target="_blank">
            NODE.JS docs:
          </Link>

          <ul>
            <li>1. We can use various of Node Modules(NM) as you can see in link above.</li>
            <li>2. Create const to call appropriate NM for example: (see chapter2)</li>
          </ul>

          <h2>Chapters content:</h2>

          <ul className="hasTypeDisc">
            <li>
              <h3>Section 1: Welcome</h3>

              <ul>
                <li>1. Terminal/ Commands - Welcome seasion (REPL Module is used here)</li>
                <li>1.1 node (run node)</li>
                <li>1.2 Click on Tab to see all available node modules and variables</li>
                <li>1.3 .exit (exit Node environment )</li>
                <li>1.4 how to tun node: node appropFile</li>
              </ul>
            </li>
            <li>
              <h3>Section 2: Introduction to Node.js and NPM</h3>

              <ul>
                <li>
                  2. Intro to Node and NPM (File System is used here)
                  <h4>const fs = require('fs');</h4>
                  <div>
                    <h4>Reading and Writing Files</h4>
                    <mark>fs.readFileSync</mark>
                    <mark>fs.writeFileSync</mark>
                  </div>
                </li>
              </ul>
            </li>
          </ul>

          <p>( backend/1-node-farm/index.js )</p>
        </div>
        <Outlet />
      </main>
    </>
  )
}
