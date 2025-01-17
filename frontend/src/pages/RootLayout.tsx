import { Header, LngSwitcher } from '../Components'
import DocsPage from './docs'
import '../i18n/config'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function RootLayout() {
  const { t } = useTranslation()
  useEffect(() => {}, [t])

  return (
    <>
      <Header />
      <LngSwitcher />

      <main>
        <DocsPage />
      </main>
    </>
  )
}
