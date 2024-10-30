import './styles/main.scss'
import React from 'react';

function App() {
  return (
    <div>
      <h1>Complete Node Bootcamp</h1>


      NODE.JS
      docs: https://nodejs.org/docs/latest/api/
      <ul>
        <li>
          1. We can use various of Node Modules(NM) as you can see in link above.
        </li>
        <li>
          2. Create const to call appropriate NM for example: (see chapter2)
        </li>
      </ul>


      <h2>Chapters content:</h2>
      <h3>Section 1: Welcome</h3>
      <ul>
        <li>1. Terminal/ Commands - Welcome seasion (REPL Module is used here)</li>
        <li> 1.1 node (run node)</li>
        <li>1.2 Click on Tab to see all available node modules and variables</li>
        <li>1.3 .exit (exit Node environment )</li>
        <li>1.4 how to tun node: node appropFile</li>

      </ul>

      <h3>Section 2: Introduction to Node.js and NPM</h3>
      <ul>
        <li> 2. Intro to Node and NPM (File System is used here)
          <h4>const fs = require('fs');</h4>
          <div>
            <mark>fs.readFileSync</mark>
            <mark>fs.writeFileSync</mark>
          </div>
        </li>
      </ul>


    </div>
  );
}

export default App;
