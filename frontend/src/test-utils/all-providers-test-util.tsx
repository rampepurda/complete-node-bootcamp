import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store as configureStore } from '../rtk-toolkit/store'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18nForTests'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={configureStore}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Provider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
