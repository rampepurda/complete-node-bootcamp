import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'

import type { AppStore, RootState } from '../rtk-toolkit/store'
import { store as setupStore } from '../rtk-toolkit/store'
// As a basic setup, import your same slice reducers
//import userReducer from '../features/users/userSlice'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    //preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore,
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export * from '@testing-library/react'
export { renderWithProviders as render }
