import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n/config'

/**
 * @function Suspense - determinate translation.json file(public)
 */

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <React.Suspense>
      <App />
    </React.Suspense>
  </React.StrictMode>
)
