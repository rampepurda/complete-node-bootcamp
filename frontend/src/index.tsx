import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Loader } from './Components/Loader/Loader'

/**
 * @param Suspense - was used because of determinate translation.json file(public)
 */

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
)
