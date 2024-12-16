import React from 'react'
import { Link } from 'react-router-dom'

export default function IntroPage() {
  return (
    <>
      <h2>Section 1: Intro Test Dummy</h2>
      <Link to="https://nodejs.org/docs/latest/api/" rel="external" target="_blank">
        See All Modules available in NODE.JS docs:
      </Link>

      <div className="hasTypeDisc hasOutline">
        <h4>We can use various of Node Modules(NM) as you can see in link above.</h4>
        <ul className="hasTypeDisc hasVerticalPadding-3">
          <li>
            For example: <strong>const fs = require('fs')</strong> // FileSystem
          </li>
        </ul>
      </div>

      <h4>Terminal:</h4>
      <ul className="hasTypeDisc hasVerticalPadding-4">
        <li>node (run node)</li>
        <li>Click on Tab to see all available node modules and variables</li>
        <li>.help</li>
        <li>.exit (exit Node environment )</li>
        <li>how to run js in node mode: node appropriateFile</li>
      </ul>
    </>
  )
}
