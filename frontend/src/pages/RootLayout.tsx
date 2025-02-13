import { Header } from '../Components'
import DocsPage from './docs'
import '../i18n/config'
import { useLocation } from 'react-router-dom'
import ReactPlayerPage from '../reactPlayer'

export default function RootLayout() {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/reactPlayer' ? (
        <ReactPlayerPage />
      ) : (
        <>
          <Header />

          <main>
            <DocsPage />
          </main>
        </>
      )}
    </>
  )
}
