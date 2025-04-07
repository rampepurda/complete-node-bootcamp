import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './rtk-toolkit/store'
import App from './App'

/**
 * @function Suspense - determinate translation.json file(public)
 */

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <React.Suspense>
      <Provider store={store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
)
